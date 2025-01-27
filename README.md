
<p align="center">
<a>
<img align="center" width="200px" src="./src/assets/Logo/UniHostelYellow.png"/>
<p align="center">serving enlightened minds with dignity</p>
</a>
</p>


<p>
<a>
</a>
</p>

***
#### *Short Overview*
*unihostel is for university students who want to get hustle free food for daily and monthly basis, Terms are simple buy any subscription packages for months and get all the benefits under the condition of subscription, Only logged in students and subscribed students can access whole website*

#### *Student Notes*
- *To stay hustle free Google Signin available, If anyone want to login anonymously can signUp with few credentials*
- *for email and password **(Note:password should be 6characters long and must have a special character, one uppercase and lowercase letters)***

- *Student can request same meal once a time till admin approval, Before approval he can cancel his request of that specific meal, after served or cancel that request he can request for the same meal again*
- *Students can leave reviews admin don't have that access, or they can edit delete or update his review if anything found wrong*
- *Payment dashboard section contains all the information of students transactions*
- *On upcoming meal section, student can leave comment and like that particular meal, if the like limit reached 10!! it will be published automatically*

#### *Admin Notes*

- *On admins dashboard, admin can edit delete or Update existed meals*
- *Admin can track down users status and can filter out based on name email and subscriptions, Admin can give access to an individual of an admin*
- *Admin can publish the upcoming announced meals or can add meals and can add new one*
- *Admin can filter out the less interacted of favorite meals and can take actions*
- *Admin can remove miss leading reviews as well*







#### *Technologies*
***This simple single page website was created with-***
- ***Framer Motion***
  - Basic Enter Animation.
  - Gestures.
  - WhileInView
  
- ***React with Vite***
    - useState 
    - useEffect,
    - Context API..
    - Custom Hooks..
    - Reusable Components.
  
- ***React Router Dom***
  - useRouterError,
  - Navigate Component,
  - Outlet,  
  - useNavigate,
  - useLocation,
  - Link

- ***Firebase Authentications***
  - Google SigIn
  - Sign Up with Email and Password
  - Update Profile
  - Signin with Email & Password

- ***Node js & Express js***
  - POST
  - GET
  - PUT
  - PATCH
  - DELETE methods
  - Router
  - Middlewares
  - Error handlers
- ***MongoDB.***
  - insertOne()
  - find()
  - findOne()
  - DeleteOne()
  - updateOne()
- ***Others***
  - tanStackQuery
  - axios
  - react-hook-form
  - react-rating-stars-component
  - react-scroll-parallax
  - sweetAlert2
  - daisy-ui
  - lenis


<br/>

<p>
<a>
<h1 align="center">Routes & Components</h1>
</a>
</p>



```mermaid
flowchart LR
classDef routeStyle fill:#D1E8FF,stroke:#004AAD,stroke-width:2px,color:#004AAD,font-size:18px,font-weight:bold;
classDef componentStyle fill:#FFEBCD,stroke:#D2691E,stroke-width:2px,color:#8B4513,font-size:18px,font-style:italic;
classDef secureStyle fill:#00897b,stroke:#00897b,stroke-width:2px,color:#fff,font-size:20px,font-style:italic;
classDef homeStyle fill:#00897b57,color:#000,font-size:16px,font-style:italic;

id1([main.jsx Root]) --> id2([MainLayout])
id2 --> id5([Student Dashboard]) 
id5-->id40([Profile])
id5-->id46([Reviews])
id5-->id41([Requested Meals])
id5-->id42([Transaction History])


id2 --> id8([Home]) --> id9([Home Page])
id9 --> id20([Banner Carousel])
id9 --> id21([Category Meals])
id9 --> id22([Subs Packages])
id9 --> id23([About Us])

id2 --> id6([Meals]) --> id7([All Meals])
id2 --> id55([Upcoming Meals]) --> id56([Upcoming Meals])

id2 --> id10([Login])
id2 -->id54([Register])
id2 --> id12([Details]) --> id13([Details Page])
id2 --> id14([Error]) --> id15([ErrorPage])


id2 --> id29([Admin Dashboard]) --> id30([Admin Profile])
id29([Admin Dashboard]) --> id31([All Users])
id29([Admin Dashboard]) --> id32([Add Meal])
id29([Admin Dashboard]) --> id33([All Meals])
id29([Admin Dashboard]) --> id34([All Reviews])
id29([Admin Dashboard]) --> id35([Serve Meals])
id29([Admin Dashboard]) --> id36([Upcoming Meals])


class id2,id4,id6,id8,id10,id12,id14,id16,id54 routeStyle
class id1,id5,id7,id9,id11,id13,id15,id17,id19,id55,id56,id29,id40,id41,id42,id43,id18 componentStyle
class id40,id30,id31,id32,id33,id34,id35,id36,id41,id42,id46 secureStyle
class id20,id21,id22,id23,id24,id25 homeStyle

```



<br/>


<p>
<a>
<h1 align="center">Server Routers and Handlers</h1>
</a>
</p>




```mermaid
flowchart LR
classDef routeStyle fill:#D1E8FF,stroke:#004AAD,stroke-width:2px,color:#004AAD,font-size:18px,font-weight:bold;
classDef componentStyle fill:#FFEBCD,stroke:#D2691E,stroke-width:2px,color:#8B4513,font-size:18px,font-style:italic;
classDef secureStyle fill:#00897b80,stroke:#00897b80,stroke-width:2px,color:#00897b8,font-size:20px,font-style:italic;
classDef homeStyle fill:#00897b,color:#fff,font-size:16px,font-style:italic;

id2([ index.js])
id2 --> id5([Config]) 
id5-->id40([dataBase.js])


id2 --> id9([Routers]) 
id9 --> id20([Students Router])
id9 --> id21([Token Router])
id9 --> id22([Admin Router])
id9 --> id23([Verify Student])
id9 --> id24([Payment Router])
id9 --> id25([Transaction Router])
id9 --> id26([StdMeal Router])
id9 --> id27([MealReview Router])

id2 --> id6([Errors]) --> id7([Custom Error Handler])
id6 --> id15([Global Error Handler])



class id2,id4,id6,id8,id10,id12,id14,id16,id54 routeStyle
class id1,id5,id7,id9,id11,id13,id15,id17,id19,id55,id40,id41,id42,id43,id18 componentStyle
class id40,id41,id42 secureStyle
class id20,id21,id22,id23,id24,id25,id26,id27 homeStyle

```


<br/>
<br/>
<br/>
<br/>
<p>
    <a>
    <h4><i></i></h4>
    </a>
    
</p>
<br/>
<br/>
<br/>
<br/>
<br/>


### *Thanks for Visiting*
### <a>*UniHostel*</a>

***The more deeply you understand the problem, the more likely you are to land on an elegant and effective solution.***

<a> ― *Luke Wroblewski*</a> 




</br>
</br>
</br>
</br>
</br>
</br>








[**_Feel Free to Visit UniHostel_**](https://unihostel.netlify.app)
<br/>
<p>
    <a>
    <h1 align="center">UniHostel</h1>
    <p align='center'>short overview of this simple project</p>
    </a>
    
</p>
<br/>
<p>
<a>
<img align="center" src="./src/assets/webPageSS/frontPage.png"/>
<img align="center" src="./src/assets/webPageSS/detailsPage.png"/>
<img align="center" src="./src/assets/webPageSS/allMeals.png"/>
<img align="center" src="./src/assets/webPageSS/adminMeals.png"/>
<img align="center" src="./src/assets/webPageSS/requestAdmin.png"/>
</a>
</p>



clientClassroom - https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-Dev-NayanBiswas.git


serverClassroom - https://github.com/Programming-Hero-Web-Course4/b10a12-server-side-Dev-NayanBiswas.git

