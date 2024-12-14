Small app for influencers management.

# Seed Users

1. Email: nick.fury@shield.com  | Password: invasion
2. Email: odin.borson@asgard.com | Password: hela


# How to build and run

## Create .env file

Run cp command to create own .env file out of .env.example

```bash
cp .env.example .env
```


.env file should contain these environment variables. You can adjust them to configure Database creation.

```bash
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
POSTGRES_PORT=

JWT_SECRET=
JWT_TOKEN_EXPIRES=7d
```


For prod it can contain also this variable
```bash
PROD_DATABASE_URL=
```

## Build Authentification

Generate a secret key.

```bash
openssl rand -base64 32
```

Store new generated secret key in .env as JWT_SECRET
```
JWT_SECRET=your_secret_key
```

##


```
npm run dev
```
http://localhost:3000




# RESTApi with Postman

## Autentification

1. Create a POST /api/login request in Postman.
In Body section in raw tab in JSON selection add this data

{
    "email":"YOUR_EMAIL",
    "password":"YOUR_PASSWORD"
}

You can use credentials of one of seed users

2. After succesful login you should receive a token in a body of your response.

{
    "token": "YOUR_TOKEN"
}

3. Check Cookies window in Postman(Usually under SEND button at top). Sometimes Postman can automatically create cookie based on response. If it didnt happen copy that token from response to create new Cookie in Postman. 

Add following data as content of your cookie:

authToken=YOUR_TOKEN; Path=/; HttpOnly;

3. Check connection by creating a GET request to /api/influencers endpoint

## Influencers

To get all influencers:
GET: /api/influencers

To get influencers filtered by Influencer Name
GET: /api/influencers?influencerName=INFLUENCER_NAME

To get influencers filtered by Manager Name
GET: /api/influencers?managerName=MANAGER_NAME

You can also filter influencers same time by manager and by Influencer. In this case app will list influencers which met both parameters: influencerName AND managerName
GET: /api/influencers?managerName=MANAGER_NAME&managerName=MANAGER_NAME

## Screenshots

![Screenshot 1](screenshots/screenshot1.png)
![Screenshot 2](screenshots/screenshot2.png)
![Screenshot 3](screenshots/screenshot3.png)
