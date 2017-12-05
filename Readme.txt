## To run this app first time ##
==========================
1) open terminal on this **project directory**
2) type **"npm install"**
3) after that type **"npm run start"**
4) this app run in **"http://localhost:3000"** in terminal it showing running port.

## Run this app on your working time ##
=================================
1) open terminal on this  **project directory**
2) type "**npm run start**"

## Add New Page ##
============
1) create new folder **if it new feature**.
2) open app.route.js file.
3) then you can see this repeet.

.when('/invite', {
            templateUrl: 'invitation/invitation.html'
        })

4) copy this content and past it after **")"** of "when".
5) give new file path to templateUrl.
6) and give route for when and you can use this route "#!/youGivenName". for example check index.html list group items href. 

#######################################NOTES#########################################################

1) app.js is the main javascript. inside of app.js we require all dependencies.
(in this require only the javascript files require.there are have any css file that link to html separately.)
after require dependencies need add them to app module. after that we can use dependencies.

2) we create folders in feature wase. ex: dashboard ui and dashboard controllers in dashboard folder.

3) if you change any javascript file (ex:adding new route) you need run this commend "**npm run compilejs**" in new terminal(*in project directory*) and **refesh browser**.

4) all images, css, fonts in resource folder. do not add or write any js file in resource folder. **if you need add it before add tell u**s.

5) if you **try new npm dependence** install it using this script "npm install yourDependence --save". it's ok to use **before add it to code** let us know it. **do not install it before tell us**.

6) if you need example for animation it on dashboard view.