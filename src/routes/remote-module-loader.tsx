import { createRequire } from "module";

const createRequires = {
    react: require('react'),
    'react-dom': require('react-dom')
}

const createConfig: any  = (dependencies: any[]) => (name: any) => {

    const _dependencies = dependencies || {};
    if(dependencies && !(name in dependencies)) {
        throw new Error("Error is thrown");
    }
  return _dependencies[name];
}
const cache : any = [];
const cacheConfig = (func: any) => {
    return (key: any) => {
        if(true) {
            if(key in cache === false) {
                cache[key] = func(key);

            }
            return cache[key];
        }
    }
}
interface CreateLoadRemoteModuleOptions {
    requires: any;
}
interface LoadRemoteModule {
   (url: string): Promise<any>;
}
interface CreateLoadRemoteModule {
    (options: CreateLoadRemoteModuleOptions): LoadRemoteModule;
}

export const createLoadRemoteModule: CreateLoadRemoteModule = ({requires}) => {

    const _requires = requires ;
    return  cacheConfig((url: any) => 
    fetcher(url).then((data: any) => {
        const exports = {};
        const module = { exports};
        const func = new Function('require', 'module', 'exports', data);
        func(_requires, module, exports);
        return module.exports;
    } ).catch((error: any) => {
        console.log("Error in main method")
    }))
}

interface Fetcher {
 (url: string) : Promise<string>;
}
const xmlHttpRequestFetcher: Fetcher = (url) => new Promise((resolve, reject) => {
 const xhr = new XMLHttpRequest();
 xhr.onreadystatechange =() => {
    if(xhr.readyState != 4) return ;
    xhr.status === 200 ? resolve(xhr.responseText) : reject('$(xhr.status');

 }
 xhr.open("GET", url, true);
 xhr.send();
});

const fetcher = xmlHttpRequestFetcher;

export const fetchRemoteComponentfromUrl: any = (compName: string, url: string) => {
    console.log("fetchRemoteComponentfromUrl   calling", );
    //to do
    const imports ='default' ;
    const dependencies = createConfig(createRequires);
    const loadRemoteModule = createLoadRemoteModule({requires: dependencies});
    return loadRemoteModule(url).then((module) => {
        const Component = module && module[imports];
        return Component;
    })
  
}