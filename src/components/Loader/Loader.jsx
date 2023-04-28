import css from './Loader.module.css';
import { Component } from "react";


export class Loader extends Component {

  render () {
    return (
      <div className={css.container}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

    )
  }
}

