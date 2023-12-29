# HypeStack

This is a list app that serves as a playground for playing around with Next.JS, React Server Components, and any libraries I'm interested in. 

- [Next.JS 14 App router](https://nextjs.org/)
- [ShadCN UI](https://ui.shadcn.com/)
- [Clerk auth](https://clerk.com/)
- [PlanetScale](https://planetscale.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- landing page designed with [v0](https://v0.dev/)

![image](https://github.com/rileyKacmarynski/hype-stack/assets/28719606/7f8f4d92-cfad-4f1a-bcdf-ba9eebc492bc)


## Deployment

- Site is hosted on [Vercel](https://vercel.com)
- Database on [PlanetScale](httsp://planetscale.com)

## Learnings
The main goal with this project is to not worry about doing things the "right way" and just be a dumping ground for learning. Here's what I've learned so far

### Next App Router and React Server Components

I've got lots of (mostly unorganized) thoughts here

Overall I'm really excited for RSCs. fetching data from in your components is great, but server actions and Next's caching is confusing. The DX is great for more traditional sites. Having strong typing and rpc type calls when fetching and writing data makes me not want to go back to a traditional SPA + backend architecture. For more traditional sites that don't require a bunch of interactivity Next.JS App Router is a huge time saver and DX boost. Adding little bits of interactivity at the leaves of your component tree is a little confusing when working with server actions and some of the new react hooks such as `useOptimistic`, `useFormStatus` and `useTransition`. There seems to be this line between a traditional web site and in app. The farther you cross the line into app territory the more painful using these new paradigms get. I think the best course of action once you start crossing that line is to treat that part of the site as a traditional SPA. The tough question is if you can do that and still take advantage of the rpc like calls for reading/writing data.

Where things start to fall apart is when you try to create more of an app like experience. If the same data is shown in across multiple spots at one time (such as a list name in the nav and header), then trying to revalidate all the data on update can be tricky. Optimistic updates also gave me some trouble. I ended up having to dump the data from the RSC into react state within client component and share that data with react context. This data synchronization is error prone, and something I wouldn't do in a production app. Usually in a SPA scenario I use react query and update the query cache before making the call to the server. This works great because the optimistic value is read throughout the app. It's a nicer API and I'm not sure if it's still usable within the context of RSCs. I think there's potential for doing something like seeding your react query cache with the data from a server component and using mutations to call server actions. I think in the future we'll see more patterns around these pain points emerge and a lot of these issues will be solved. 

### Drizzle
This is seriously sweet. I'm not a huge database buff, but know enough to be dangerous. It does what it needs to and is pretty easy to use. The db push functionality is great for prototyping projects like this one. The schema definition is intuitive, even when it comes to making relations in planetscale without foreign keys. I would imagine it would do a pretty good job of staying out of your way if you did need to dive into some pretty gnarly SQL. No complaints.

### ShadCN UI
Amazing. I have concerns about the maintainability of tailwind components long term, but for this kind of thing it's perfect. My GitHub is a graveyard of unfinished projects. My ambitions died shortly after `npm init` due to fighting with component libraries. Component libraries give you a lot out of the box, but I've found that you have to be ok with the library dictating influencing your design choices otherwise your in for pain. With ShadCN if I don't like how something looks I'll just hop inside the component and change it. I don't want my component library to influence how I design the stuff I build in my free time. 

### Clerk
I've never thought less about auth. For these kinds of project setting up auth routes/components feels like a waste of time. Most the time I'm lucky to even get auth set up before I abandon a project. Not here, I think I had everything set up in an hour.
