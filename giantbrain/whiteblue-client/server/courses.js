'use strict';


const courses = {
                  teacher : "Kerry Watson Dowgly",
                  course : "Web developpemnt New technology ",
                  lesson : "React.js front-end developpemnt",
                  tabs : [{
                            chapter : 'Getting started',
                            place : 1,
                            sections : [{
                                          hearder : { 
                                                      hearderId : 1,
                                                      hearderTittle :'Before You get started'
                                                    },
                                          subSections : [{
                                                            subSectionsId : 1,
                                                            subSectionsTittle : 'Node.js and npm',
                                                            content : "\t React fits in the modern JavaScript development ecosystem. To code along with the examples in this book,\n you will need to have Node.js and npm installed. You should also be familiar with functional JavaScript\n paradigms as well as some of the language’s newest features, such as arrow functions and classes."
                                                          },{
                                                            subSectionsId : 2,
                                                            subSectionsTittle : 'Javascript ES6',
                                                            content : "\t JavaScript was born to run on the browser, but Node.js makes it possible to run JavaScript programs on\n your local computer and on a server through its open source command line tool. Together with npm (Node\n Package Manager), Node.js has become invaluable for local development of JavaScript-heavy applications,\n allowing a developer to create scripts for running tasks (such as copying and moving files or starting a local\ndevelopment server, for example) and to automatically download dependencies.\n If you don’t have Node.js installed, take your time to install it now by downloading the installer for\nWindows, Mac or Linux at https://nodejs.org/."
                                                          }]  //sub-sections
                                        },{
                                            hearder : { 
                                                        hearderId : 2,
                                                        hearderTittle :'Defining React'
                                                      },
                                            subSections : [

                                            ] //sub-sections
                                        },{
                                            hearder : { 
                                                        hearderId : 3,
                                                        hearderTittle :"React's Benefits"
                                                      },
                                            subSections : [{
                                                              subSectionsId : 1,
                                                              subSectionsTittle : 'Reactive Rendering is simple',
                                                              content : "\t There are a lot of JavaScript MVC frameworks out there. So why did Facebook build React and why would\n you want to use it? In the next three sections, we’ll explore some of its benefits in order to answer this\n question."
                                                            },{
                                                              subSectionsId : 1,
                                                              subSectionsTittle : 'Component-Oriented Development Using pure javascript',
                                                              content : "\t In a React application, everything is made of components, which are self-contained, concern-specific\n building blocks. Developing applications using components allows a “divide and conquer” approach where\n no particular part needs to be especially complex. They are kept small and because they can be combined,\n it’s easy to create complex and more feature-rich components made of smaller components.\n React components are written in plain JavaScript, instead of template languages or the HTML directives\ntraditionally used for web application UIs. This is for a good reason: templates can be limiting because they\n dictate the full set of abstractions that you are allowed to use to build your UI. React’s use of a full-featured\n programming language to render views is a big advantage to the ability to build abstractions.\n Additionally, by being self-contained and using a unifying markup with its corresponding view logic,\n React components lead to a separation of concerns. In the early days of the Web, different languages were\n created to force a separation of concerns: HTML for content structure, CSS for styling, and JavaScript for\n behavior. This separation worked very well when it was introduced because the pervading style of web page\n at the time was a static presentation. But now that interfaces are magnitudes more interactive and complex,\n display logic and markup have inevitably become tied together; the separation between markup, styling, and\n JavaScript turned into just a separation of technologies, not a separation of concerns.\n React assumes that display logic and markup are highly cohesive; they both show the UI and encourage\nthe separation of concerns by creating discrete, well-encapsulated, and reusable components for each concern."
                                                            }] //sub-sections
                                 }]//sections
                    },{
                            chapter : 'Inside the DOM Abstraction',
                            place : 2,
                            sections : [{
                                          hearder : { 
                                                      hearderId : 1,
                                                      hearderTittle :'Events in React'
                                                    },
                                          subSections : [{
                                                            subSectionsId : 1,
                                                            subSectionsTittle : 'DOM Event Listeners',
                                                            content : ""
                                                          },{
                                                            subSectionsId : 2,
                                                            subSectionsTittle : 'Kanbap App: Managing the DOM',
                                                            content : "In your Kanban app, the Card component has a title, a description, and other properties. By way of an \n example, you’re going to write a validator that will warn if the card title is longer than 80 characters. The code\n is shown in Listing 3-5, and a sample card failing the custom propType validator is represented in Figure 3-1."
                                                          }]  //sub-sections
                                        },{
                                            hearder : { 
                                                        hearderId : 2,
                                                        hearderTittle :'Digging Deeper in JSX'
                                                      },
                                            subSections : [
                                                            {
                                                              subSectionsId : 1,
                                                              subSectionsTittle : 'JSX vs. HTML',
                                                              content : "For web usage, JSX looks like HTML, but it’s not an exact implementation of the HTML specification. React’s\n creators went so far to make JSX similar enough to HTML so it could be used to describe web interfaces\n properly, but without losing sight of the fact that it should also conform to JavaScript style and syntax."
                                                            }
                                            ] //sub-sections
                                        },{
                                            hearder : { 
                                                        hearderId : 3,
                                                        hearderTittle :"Differences Between JSX and HTML"
                                                      },
                                            subSections : [{
                                                              subSectionsId : 1,
                                                              subSectionsTittle : 'Tag Attributes Are Carmel Cased',
                                                              content : "For example, in HTML, the input tag can have an optional maxlength attribute:\n <input type='text' maxlength='30' />\n In JSX, the attribute is written as maxLength note the uppercase 'L' \n return <input type='' maxLength='30' />"
                                                            },{
                                                              subSectionsId : 1,
                                                              subSectionsTittle : 'All Elements Must be balanced',
                                                              content : "Since JSX is XML, all elements must be balanced. Tags such as <br> and <img>, which don’t have ending tags,\n need to be self-closed. So, instead of <br>, use <br/> and instead of <img src=''>, use <img src='' />."
                                                            },{
                                                              subSectionsId : 1,
                                                              subSectionsTittle : 'Attribute Names are Based on the DOM API',
                                                              content : "This can be confusing, but it is actually very easy. When interacting with the DOM API, tag attributes may\n have different names than those you use in HTML. One of such example is class and className.\n For example, given this regular HTML"
                                                            }] //sub-sections
                                 }]//sections
                    },{
                            chapter : 'Architecting Applications with Components',
                            place : 3,
                            sections : [{
                                          hearder : { 
                                                      hearderId : 1,
                                                      hearderTittle :'Prop Validation'
                                                    },
                                          subSections : [{
                                                            subSectionsId : 1,
                                                            subSectionsTittle : 'Default Prop Values',
                                                            content : "You can also provide a default prop value in case none is provided. The syntax is similar: define a defaultProps object as a constructor property. You could, for example, leave the prop salutation optional (by removing the isRequired) and give it a default value of Hello World:"
                                                          },{
                                                            subSectionsId : 2,
                                                            subSectionsTittle : 'Built-in propType Validators',
                                                            content : "React propTypes export a range of validators that can be used to make sure the data you receive is valid. By default, all of the propTypes in Tables 3-1 through 3-3 are optional, but you can chain with isRequired to make sure a warning is shown if the prop isn’t provided."
                                                          }]  //sub-sections
                                        },{
                                            hearder : { 
                                                        hearderId : 2,
                                                        hearderTittle :'Component Composition Strategies and Best practices'
                                                      },
                                            subSections : [{
                                                            subSectionsId : 1,
                                                            subSectionsTittle : 'Stateful and Pure functions',
                                                            content : "So far you’ve seen that components can have data as props and state. • Props are a component’s configuration. They are received from above and immutable as far as the component receiving them is concerned. • State starts with a default value defined in the component’s constructor and then suffers from mutations in time (mostly generated from user events). A component manages its own state internally, and every time the state changes, the component is rendered again. In React’s components, state is optional. In fact, in most React applications the components are split into two types: those that manage state (stateful components) and those that don’t have internal state and just deal with the display of data (pure components). The goal of pure components is to write them so they only accept props and are responsible for rendering those props into a view. This makes it easier to reuse and test those components. However, sometimes you need to respond to user input, a server request, or the passage of time. For this, you use state. Stateful components usually are higher on the component hierarchy and wrap one or more stateful or pure components. It’s a good practice to keep most of an app’s components stateless. Having your application’s state scattered across multiple components makes it harder to track. It also reduces predictability because the way your application works becomes less transparent. There’s also the potential to introduce some very hard-tountangle situations in your code."
                                                          },{
                                                            subSectionsId : 2,
                                                            subSectionsTittle : 'Which component Should be Stateful?',
                                                            content : "Recognizing which components should own state is often the most challenging part for React newcomers to understand. When in doubt, follow this four-step checklist. For each piece of state in your application, • Identify every component that renders something based on that state. • Find a common owner component (a single component above all the components that need the state in the hierarchy). • Either the common owner or another component higher up in the hierarchy should own the state. • If you can’t find a component where it makes sense to own the state, create a new component simply to hold the state and add it somewhere in the hierarchy above the common owner component."
                                                          }] //sub-sections
                                        },{
                                            hearder : { 
                                                        hearderId : 3,
                                                        hearderTittle :"Component Lifecycle"
                                                      },
                                            subSections : [{
                                                              subSectionsId : 1,
                                                              subSectionsTittle : 'Lifecycle Phases and Methods',
                                                              content : "To get a clear idea of the lifecycle, you need to differentiate between the initial component creation phase, state and props changes, triggered updates, and the component’s unmouting phase. Figures 3-4 to 3-7 demonstrate which methods are called on each phase."
                                                            },{
                                                              subSectionsId : 2,
                                                              subSectionsTittle : 'Lifecycle Functions in Practice : Data Fetching',
                                                              content : "To illustrate the usage of lifecycle methods in practice, imagine you want to change your last Contacts application to fetch the contacts data remotely. Data fetching is not really a React subject; it’s just plain JavaScript, but the important aspect to notice is that you do have to fetch the data on a specific lifecycle of the component, the componentDidMount lifecycle method. Since this chapter is about strategies and good practices for component composition, it is also worth noting that you should avoid adding data fetching logic to a component that already has other responsibilities. A good practice, instead, is to create a new stateful component whose single responsibility is communicating with the remote API, and passing data and callbacks down as props. Some people call this type of component a container component. You will use the idea of a container component in your Contacts app, so instead of adding the data-fetching logic to the existing ContactsApp component, you will create a new component called ContactsAppContainer on top of it. The old ContactsApp won’t be changed in any way. It will continue to receive data via props."
                                                            }] //sub-sections
                                 },{
                                            hearder : { 
                                                        hearderId : 4,
                                                        hearderTittle :"A Brief Talk About Immutability"
                                                      },
                                            subSections : [{
                                                              subSectionsId : 1,
                                                              subSectionsTittle : 'Immutability in Plain JavaScript',
                                                              content : "The main idea behind immutability is just to replace the object instead of changing it, and while this is absolutely possible in plain JavaScript, it’s not the norm. If you’re not careful, you may unintentionally mutate objects directly instead of replacing them. For example, let’s say you have this stateful component that displays data about a voucher for an airline travel (the render method is omitted in this example because you are only investigating the component’s state):"
                                                            },{
                                                              subSectionsId : 2,
                                                              subSectionsTittle : 'Nested Objects',
                                                              content : "Although an array’s non-destructive methods and Object.assign will do the job on most cases, it gets really tricky if your state contains nested objects or arrays. This is because of a characteristic of the JavaScript language: objects and arrays are passed by reference, and neither the array’s non-destructive methods nor Object.assign make deep copies. In practice, this means the the nested objects and arrays in your newly returned object will only be references to the same objects and arrays on the old object."
                                                            },{
                                                              subSectionsId : 3,
                                                              subSectionsTittle : 'React Immutability Helper',
                                                              content : "React’s add-on package provides an immutability helper called update. The update function works on regular JavaScript objects and arrays and helps manipulates these objects as if they were immutable: instead of actually changing the object, it always return a new, mutated object. To begin with, you’ll need to install and require the library:"
                                                            },{
                                                              subSectionsId : 4,
                                                              subSectionsTittle : 'Wiring Up the Task Callbacks as Props',
                                                              content : "Now let’s create three functions to manipulate the tasks: addTask, deleteTask, and toggleTask. Since tasks belong to a card, all functions need to receive the cardId as a parameter. The addTask will receive the new task text, while both deleteTask and toggleTask should receive the taskId and the taskIndex (the position inside the card’s array of tasks). You will pass the three functions down the whole hierarchy of components as props. As a small trick to save a little typing, instead of creating one prop to pass each new function, you create a single object that references the three functions and pass it as a single prop. The code is shown in Listing 3-16."
                                                            }] //sub-sections
                                 }]//sections
                    }]// chapters
                };
          
module.exports = {
    courses : courses
  };