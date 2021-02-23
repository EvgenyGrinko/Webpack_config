const asynsFunction = async () => {
    return await Promise.resolve('Async working');
};
asynsFunction().then(console.log);

class Utils {
    static field = 'Hello'
}

console.log(Utils.field);
import('lodash').then( ({ default: _ }) => {
    console.log('lodash', _.random(0, 9, true))
})