import Post from '@models/Post';
import '@/styles/styles.css';
import json from '@/assets/json';
import './scss.scss';
import './babel';

const post = new Post('Test title');

console.log(`Post to string: `, post.toString());

console.log(json)