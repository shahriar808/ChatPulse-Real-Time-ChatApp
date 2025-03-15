# Chat Application

This is a MERN (MongoDB, Express, React, Node.js) stack chat application.

# Live Link
https://chatpulse-real-time-chatapp.onrender.com

## Environment Variables

Create a `.env` file in the `backend` directory with the following content:

```properties
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.omxqj.mongodb.net/chat-app?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
JWT_SECRET=<your_jwt_secret>
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
NODE_ENV=development
```

Replace `<username>`, `<password>`, `<your_jwt_secret>`, `<your_cloudinary_cloud_name>`, `<your_cloudinary_api_key>`, and `<your_cloudinary_api_secret>` with your actual credentials.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/shahriar808/ChatPulse-Real-Time-ChatApp.git
cd ChatPulse-Real-Time-ChatApp
```

2. Install dependencies:

```bash
npm run install
```

## Build

To build the project, run:

```bash
npm run build
```

## Start

To start the project, run:

```bash
npm run start
```

## Deployment

Ensure that your deployment settings on Render are correctly configured to run the build script. The build command should be:

```bash
npm run build
```

And the start command should be:

```bash
npm run start
```
