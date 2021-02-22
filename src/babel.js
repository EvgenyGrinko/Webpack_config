const asynsFunction = async () => {
    return await Promise.resolve('Async working');
};
asynsFunction().then(console.log);

class Utils {
    static field = 'Hello'
}

console.log(Utils.field)