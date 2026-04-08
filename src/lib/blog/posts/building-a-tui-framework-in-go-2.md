---
layout: blog
title: "Building a TUI framework in Go Part 2"
description: "Designing components on top of Bubble Tea"
tags: ["go", "tui"]
date: 2026-04-05
---
 
Last time I built the routing for the mini framework(Boba) built on [Bubble Tea](https://github.com/charmbracelet/bubbletea). Now that I had a root navigation system I need to figure out how to navigate. Having to assign key presses for navigation in every screen would not only clutter up the screens, but also risk the possibility of breaking the routing or even worse forgetting to assign a key at all. This is where `App` solves this issue. Think of `App` as a controller or root model. All messages from Bubble Tea first go through `App`, which can decide how to handle them before passing them down to the current screen. This lets me define global behavior like keybindings (quit, back) in one place, without every screen needing to implement them. Amazing right? Since all `Msg`s flow through `App`, it can either consume them or forward them to the current screen and that includes key presses. This next block has a couple of things I'll address in the future but there are a few *key* features to take from it right now:

```go 
func (a *App) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {

	case tea.KeyPressMsg:
		if Keys.Quit.Match(msg) {
			return a, tea.Quit
		}
		if Keys.Back.Match(msg) {
			a.pop()
			return a, nil
		}
	}

	newScreen, cmd := a.current.Update(msg)

	if newScreen != a.current {
		initCmd := a.push(newScreen)
		return a, tea.Batch(cmd, initCmd)
	}

	return a, cmd
}
```
By handling key presses inside App, other screens can use them without ever knowing. The most important part of `App` and what makes this architecture possible is this little part:

```go 
	newScreen, cmd := a.current.Update(msg)

	if newScreen != a.current {
		initCmd := a.push(newScreen)
		return a, tea.Batch(cmd, initCmd)
	}
```
It allows screens to control navigation indirectly by returning a new screen, while `App` owns the navigation stack. I know you're probably wondering, and if not you are now. Where is the next screen key?  
That is a great question, and to put it simply I decided that it should live inside the screen.  
Why you ask?  
Well, that key is too abstract.  
What key and what do you mean by abstract you ask?  
Well... sorry, I'll stop talking like this and get to the point. The Submit key is a key that you would probably want to assign a lot of functionalities, binding it globally to a single command doesn't seem very ideal and it breaks the ability to allow users to configure it. Not to worry though, you won't have to assign it to every screen `Update` either because I came up with a solution for that, but that will come a bit later.  

Don't forget at this point in the project I was still naive and focusing on making the perfect automated TUI maker for my quiz app, so the next step was naturally building the screen. To build the screen I had to ask myself a couple of things:
1. What exactly is a screen?
2. What is a cursor? 
3. How to use cursor to navigate screen? 
4. How to render screen? 

Those were questions that felt different at the time, but to have a fully functioning screen I needed to have all of them working at once. Bubble Tea's other library is [Bubbles](https://github.com/charmbracelet/bubbles/tree/main) which offers an extensive number of components that you can use to make a TUI, the downside is that while they reduce a lot of boilerplate, they also come with their own. Me wanting to avoid extra boilerplate started out by deciding I wanted to make my own components, that would require minimal setup and easy reusability (you see the irony here right?). 
That did not mean that I didn't want to include Bubbles components as features to use as well, I would just need to use it in a roundabout way and circle back to it once I was done with my own component? component builder? Yeh, oh boy this part was going to get confusing really fast, so fast that I had it refactored, renamed at least 5 times (don't worry I won't go over all the refactors but I will mention some of them if they were important to the current state of Boba). 
The reason I mentioned components was because they answer the four big questions I previously had, and an extra secret question I had been asking myself for far too long. What is a model?  A model is anything that can handle messages and render itself. In Bubble Tea, that means implementing `Init`, `Update`, and `View`, or like some of Bubbles components just `Update`, and `View`. That means `Screen` is a model and so is `App`, and now so is this component... confusing, right? I was too, very. 
The good news is that I did have some idea of what I wanted my component to look like and what I wanted it to do, I just didn't know if component was the correct term for it and you will see why in a bit (don't worry, I'll show it to you in this post... a part of it at least).
The goal was to have component be this model that I would place on the screen and it would not only render itself but also have built in navigation off the bat with no setup required, the only thing you would need to pass the data you want to have it display and it would do the rest for you. This would eliminate 2 things: 
1. Having to consistently add key presses for navigation. 
2. Having to write the rendering logic on the screen which would take time and reusing it would mean more boilerplate. 

So `Screen` is the route and component is the displayed data. To achieve this, I designed a model called `Block`. To make Boba as easy to use things like navigation and rendering had to be centralized. So I added a rule, every Boba component needs to be a Block. That includes Bubbles components too. For this to work I had to find a solution for the navigation, `Block` had to generate that when a component was made (unless it was a pre-existing component, which we will get to later). To make navigation consistent across all components, I needed a structure to represent movement.
Most TUIs navigate using a keyboard (as you should) and use the vim keys 'hjkl'. Realistically TUIs usually display lists/tables for the most part which means navigation is very grid like, and which is why I opted to making a directed adjacency list graph (it's too much code for a post but you can check it out [here](https://github.com/cheezecakee/boba/blob/main/graph.go)) for the core navigation mechanic. The way this works is by treating each piece of data passed to Block acts as a node, and the graph builder would create the edges.

```go
type Block[T BubbleModel[T]] struct {
	Graph     *Graph
	cursor    Cursor
	dimension Dimension
    // some other stuff here
}

func (b *Block[T]) Grid(rows, cols int) *Block[T] {
	if b.model != nil {
		return b
	}

	builder := &NavBuilder{graph: b.Graph}
	total := len(b.items)

	// create nodes
	for r := range rows {
		for c := range cols {
			idx := r*cols + c
			cursor := Cursor{Row: Row(r), Col: Col(c)}

			enabled := idx < total
			builder.Node(cursor, NodeMeta{Enabled: enabled})
		}
	}

	// connect edges
	for r := range rows {
		for c := range cols {
			cur := Cursor{Row: Row(r), Col: Col(c)}

			if r < rows-1 {
				down := Cursor{Row: Row(r + 1), Col: Col(c)}
				builder.BiEdge(cur, Down, down)
			}
			if c < cols-1 {
				right := Cursor{Row: Row(r), Col: Col(c + 1)}
				builder.BiEdge(cur, Right, right)
			}
		}
	}

	b.Graph = builder.Build()

	b.dimension = Dimension{
		Rows: rows,
		Cols: cols,
	}

	return b
}

func (b *Block[T]) Vertical() *Block[T] {
	if b.model != nil {
		return b
	}

	return b.Grid(len(b.items), 1)
}

func (b *Block[T]) Horizontal() *Block[T] {
	if b.model != nil {
		return b
	}

	return b.Grid(1, len(b.items))
}
```

I know there is a lot going on here, but bare with me because we are only scratching the surface. I made a Grid builder for `Block` that used the data(`items`) as the node, this simplified the creation of lists and bars as well because a list is just a 1xN Grid and a bar is a Nx1 grid. Now that my `Block` had a graph I could use the cursor to navigate through the `items`:

```go
func (b *Block[T]) Move(dir Direction) bool {
	if b.Graph == nil || !b.navigable {
		return false
	}
	next, ok := b.Graph.Move(b.cursor, dir)
	if ok {
		b.cursor = next
	}
	return ok
}
```

I now had all the moving pieces(literally) I needed to navigate through my Block but I didn't have the keys for it, which we will dive into in the next part.
