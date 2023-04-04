import React from 'react';
import { Info, Repos, User, Search, Navbar } from '../components';
import loadingImage from '../images/preloader.gif';
import { GithubContext } from '../context/context';

const Dashboard = () => {
  const {requests, error, searchGithubUser, isLoading} = React.useContext(GithubContext);
  // console.log(isLoading);
  if(isLoading) {
    return (
      <main>
        <Navbar></Navbar>
        <Search requests={requests} error={error} searchGithubUser={searchGithubUser}></Search>
        <img src={loadingImage} className='loading-img' alt="loading-gif" />
      </main>
    )
  }
  return (
    <main>
      <Navbar></Navbar>
      <Search requests={requests} error={error} searchGithubUser={searchGithubUser}></Search>
      <Info></Info>
      <User></User>
      <Repos></Repos>
    </main>
  );
};

export default Dashboard;
