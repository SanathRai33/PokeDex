
function useDebounce (cb, delay= 3000) {
    let timerId;
    return ( ...args) => {
        timerId = setTimeout(()=>{
            cb(...args);
        }, delay)
    }
}

export default useDebounce;