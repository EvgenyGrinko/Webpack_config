import Post from '@models/Post';
import '@/styles/styles.css';
import json from '@/assets/json';
import './scss.scss';
import './babel';
import React from 'react';
import { render } from 'react-dom';
import App from './App';

const post = new Post('Test title');

console.log(`Post to string: `, post.toString());
console.log(json)

render(<App />, document.getElementById('root'))