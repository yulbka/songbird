import React from 'react';

import { Header } from './Header/Header';

import styles from './App.module.scss';

export class App extends React.Component{
  render() {
    return (
      <div className={styles.wrapper}>
        <Header />
      </div>
    )
  }
}