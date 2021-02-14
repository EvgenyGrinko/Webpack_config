import Post from './Post';
import './styles/styles.css';
import json from './assets/json';

const post = new Post('Test title');

console.log(`Post to string: `, post.toString());

console.log(json)