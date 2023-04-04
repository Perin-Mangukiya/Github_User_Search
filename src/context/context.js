import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

const GithubProvider = ({children}) => {

    const [githubUser, setGithubUser] = useState(mockUser);
    const [repos, setRepos] = useState(mockRepos);
    const [followers, setFollowers] = useState(mockFollowers);

    // request loading
    const [isLoading, setIsLoading] = useState(false);
    const [requests, setRequests] = useState(0);

    // error
    const [error, setError] = useState({show: false, msg: ""});

    const checkRequests = () => {
      // setIsLoading(true);
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequests(remaining);
        if (remaining === 0) {
          toggleError(true, 'sorry, you have exceeded your hourly rate limit!');
        }
      })
      .catch((err) => console.log(err));
    }

    const searchGithubUser = async (user)=>{
      toggleError();
      setIsLoading(true);
      const response = await axios(`${rootUrl}/users/${user}`).catch((err)=>console.log(err));
      
      if(response) {
        console.log(response.data);
        setGithubUser(response.data);
        const { login, followers_url } = response.data; 

        // repos
        // axios(`${rootUrl}/users/${login}/repos?per_page=100`).then((response) => setRepos(response.data));

        // // followers
        // axios(`${followers_url}?per_page=100`).then((response) => setFollowers(response.data));

        // It is used to load all the data all together or to
        // send the request together
        Promise.allSettled([
          axios(`${rootUrl}/users/${login}/repos?per_page=100`),
          axios(`${followers_url}?per_page=100`)
        ])
        .then((results) => {
          const [repos, followers] = results;
          const status = 'fulfilled'
          
          if(repos.status==='fulfilled') setRepos(repos.value.data);
          if(repos.status==='fulfilled') setFollowers(followers.value.data);
        })

      }
      else {
        toggleError(true, "there is not user with that username");
      }
      checkRequests();
      setIsLoading(false);
    }

    function toggleError(show = false, msg = '') {
        setError({show, msg});
    }

    useEffect(() => {
        checkRequests();
    }, [])

    return (
        <GithubContext.Provider value={{requests, githubUser, repos, followers, error, searchGithubUser, isLoading}}>
            {children}
        </GithubContext.Provider>
    )
}

export {GithubProvider, GithubContext};