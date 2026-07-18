---
layout: blog
title: "How TUI Navigation Works on the Inside"
description: "Building a TUI navigation from scratch"
tags: ["go", "tui"]
date: 2026-07-17
---

Before diving into how TUI nagivation works, it's better to understand what a TUI is.
A TUI is a terminal user interface, it's a visual representation of a tool/app in the
termial rendered completely by strings. The most common way to navigate TUIs is through
your keyboard (though mouse interaction is becoming more popular too).
I spend a lot of my time in the terminal, specially when I'm on Linux (NixOS btw), and
I've always been interested terminal tools. They are meant to be minimal, fast and easy
to use and don't require a mouse. So you can go from an editor like vim straight to the
external tool you need without ever leaving the terminal, pretty neat, right?

In this snippet I'm going to show how to build a simple TUI with navigation. I'm going to be
writing it in Go and using vim motions for the navigation (hjkl). But you can use
whatever keybinds you want, if you follow along.To start we need to understand how TUIs
render, I previous mentioned it's by using strings, and there isn't much more to it, the only
caveat I would say is that it render by row, so if you want to render a square for example you
would need to break it down like this:

```shell
Row 1: ┌ ─ ─ ─ ┐
Row 2: │       │
Row 3: └ ─ ─ ─ ┘
```

I added some space between the character for you to visualize, but basically you would need to print
Row 1 -> add a new line -> print Row 2 -> add a new line -> print Row 3. This creates some limitations
on how navigaiton is implemented.

Let's start implementing and I'll explain as we go, the first part:

```go
    package main

    import (
        "fmt"
        "os"

        "golang.org/x/term"
    )

    func main() {
        running := true

        oldState, err := term.MakeRaw(int(os.Stdin.Fd()))
        if err != nil {
            panic(err)
        }

        defer term.Restore(int(os.Stdin.Fd()), oldState)

        for running {
            fmt.Print("\\rPress any key: ")

            b := make([]byte, 1)
            _, err = os.Stdin.Read(b)
            if err != nil {
                panic(err)
            }

            if b[0] == 113 { // quit
                fmt.Print("\\n\\rExiting\\r\\n")
                running = false
                break
            }

            fmt.Printf("\\n\\rYou pressed: %q (ASCII: %d) \\n", b[0], b[0])
        }

        fmt.Print("\\r\\n")
    }
```

We are using the Go standard library term (`golang.org/x/term`) to read individual keystrokes. 
Normally the terminal buffers the input and only sends it to your program when **Enter** is 
pressed. To read the individual keystrokes, we need to set the terminal in a way that every input 
is sent immediately. `MakeRaw()` does exactly that: it sets the terminal into `raw mode` so we can 
get instant feedback. It also returns the previous state of the terminal (in this case `normal mode`). 
This is important because it lets us restore the terminal to `normal mode` when we're done. 
`os.Stdin.Fd()` tells the function which terminal to put into `raw mode`. For the terminal's `stdin`, 
this value is usually `0`.

> Note: On non-Unix systems os.Stdin.Fd() may not be 0. Worth checking out if you run into any issues.

Inside the loop there are a couple of things to note. We allocate a slice of length 1 to store the 
keystroke read from `stdin`.

Most keys are represented by a single ASCII byte. The terminal doesn't interpret keys the same way we do. 
This can be observed by running the code:

```shell
Press any key: 
You pressed: 'j' (ASCII: 106) 
Press any key: 
You pressed: 'k' (ASCII: 107) 
Press any key: 
You pressed: 'l' (ASCII: 108) 
Press any key: 
You pressed: 'h' (ASCII: 104) 
Press any key: 
```

> Note: Special keys (é, ←, ↑) have more than one byte and are treated a bit differently. We'll ignore those 
for now.

We can see how a TUI processes input: read a key, inspect its value, and decide what action to perform.
In this example, pressing `q` exits the program by comparing the input against its ASCII value (`113`). Later 
on, we'll use this same approach to move the cursor around the interface.

For the next part:

```go
    func main() {
        running := true

        cursor := 0

        menu := []string{"start", "stats", "settings"}

        oldState, err := term.MakeRaw(int(os.Stdin.Fd()))
        if err != nil {
            panic(err)
        }

        defer term.Restore(int(os.Stdin.Fd()), oldState)

        fmt.Print("\\033[?25l")
        defer fmt.Print("\\033[?25h")

        for running {
            for i, option := range menu {
                if i == cursor {
                    fmt.Printf("[%s] ", option)
                } else {
                    fmt.Printf(" %s  ", option)
                }
                fmt.Print("\\033[K")
            }

            fmt.Print("\\r")

            b := make([]byte, 1)
            _, err = os.Stdin.Read(b)
            if err != nil {
                panic(err)
            }

            // detect key press
            switch b[0] {
            case 113: // quit
                fmt.Print("\\n\\rExiting\\r\\n")
                running = false
                continue
            case 104: // left
                if cursor > 0 {
                    cursor--
                }
            case 108: // right
                if cursor < len(menu)-1 {
                    cursor++
                }
            }

        }
        fmt.Print("\\r\\n")
    }
```

I know a lot has changed, so let's go one step at a time. First I created a `cursor` and set it to `0`, this 
will help us keep track of our position in the terminal when navigating. I then created a slice containing the 
options to be displayed in the TUI. This snippet of random characters:

```go
    fmt.Print("\\033[?25l")
    defer fmt.Print("\\033[?25h")
```

is just another ANSI escape sequence, but this one tells the terminal to hide the cursor that you usually see, 
because we will be using a custom one. The code inside the `defer` shows the cursor again once the program is 
done running. The fun part actually comes from two snippets, the first one is this tiny loop:

```go
    for i, option := range menu {
        if i == cursor {
            fmt.Printf("[%s] ", option)
        } else {
            fmt.Printf(" %s  ", option)
        }
        fmt.Print("\\033[K")
    }
```

All it does is print our options in the terminal side by side. Since the options are in a slice, we use its index 
as the position and compare it to the cursor. If our cursor is at that index, we print the option with `[ ]` around 
it. This gives us a nice looking cursor to indicate which option we are hovering over:

```shell
[start]  stats   settings
```

You can change the look of your cursor to any character you want, another common one is `>`. To get the nice 
asymmetrical look we have, notice how I added some extra spacing around the printed options. This compensates for the 
cursor space when it moves to that option. It removes the weird text shift that would be there without it.
The next piece is the ANSI escape sequence `\\033[K`, which clears everything from the cursor to the end of the current 
line. Without it, characters from the previous render would remain on the screen if the newly rendered line happened to 
be shorter.
Lastly, `fmt.Print("\\r")` is what allows us to redraw the menu in the same place. Terminals work by writing characters 
from the current terminal cursor position forward, they don't automatically replace the previous output. `\\r` moves the 
cursor back to the beginning of the line, allowing us to overwrite the previous render with the updated menu. Without it, 
every cursor movement would just print a new menu after the previous one, quickly making the output unreadable.

For the cursor movement we circle back to the same approach we used with the exit key:

```go

    // detect key press
    switch b[0] {
    case 113: // quit
        fmt.Print("\\n\\rExiting\\r\\n")
        running = false
        continue
    case 104: // left
        if cursor > 0 {
            cursor--
        }
    case 108: // right
        if cursor < len(menu)-1 {
            cursor++
        }
    }
```

I opted to use a `switch` statement just because I find it cleaner. Here, when pressing `h` we decrease the cursor by one, 
and when pressing `l` we increase it by one. Notice I added some bounds checks so we don't go past the available indexes in 
our `menu` slice.

That's it! You now have a simple terminal menu that responds to keyboard input without relying on any external TUI framework.
Even though this example is small, it demonstrates the core loop behind many terminal interfaces: read input, update the 
application state, and render the interface again. Horizontal navigation is fairly straightforward because everything lives on
a single line. Vertical navigation is where things get more interesting, since the terminal renders line by line and each row 
can have a different number of options. I won't cover that implementation here, but I've included the full source code [here](https://github.com/cheezecakee/tui-navigation-demo) if you'd like to compare it with your own attempt.

If you're following along, I'd encourage you to try implementing vertical navigation yourself before looking at the solution. 
It's a fun exercise and, at least for me, it made the way terminal UIs work a lot easier to understand.
