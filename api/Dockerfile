FROM node
# ^^^ ! note - looks like the 1st command must be in the 1st line ^^^
# The FROM instruction initializes a new build stage and sets the Base Image for subsequent instructions. 
# As such, a valid Dockerfile must start with a FROM instruction


# where we want to place app contents insie the container
# the next RUN/COPY/etc.. commands will work from this path
WORKDIR /usr/src/app

# copy file from this files-system path to the path in the container
COPY package*.json ./

# run app build commands in the container
RUN npm install

# copy all the new content from the local app to the container after the npm run 
COPY . .

# expose the port that we are working on
EXPOSE 4000

# command to run after exposing the port 
CMD ["npm", "start"]

