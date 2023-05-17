import RemoteComponent from "./RemoteComponent";

function DynamicComponent (props: any) {

    const pageconfigjson = [{
        "id": "prelogin",
        "components" : [{
            "remoteComponentName": "PreloginLib"
        }]
    }]

    const pageName = props.pageName ;
    console.log('pageName =====', pageName)
    const pageConfig = pageconfigjson.find(config => {
        console.log('config.id  =====', config.id )
        if(pageName === config.id ) { 
            console.log('config =====', config )
            return config;}
    });
    console.log('pageConfig', pageConfig)
    let componentList = pageConfig?pageConfig.components  : [];
    console.log('componentList', componentList)
    // if(pageConfig) {
    //     componentList = pageConfig.components;
    // }

    let pageChildren: any[] = [];
    componentList.forEach(child => {
        console.log("child component")
        pageChildren[pageChildren.length] = {
            ChildComponent: RemoteComponent,
            index: pageChildren.length,
            remoteComponentName: child.remoteComponentName
        }
    })
return (
    <div>
        {pageChildren.map(value => {
            console.log("value===",value)
            return (
                <value.ChildComponent pageName = {pageName} remoteComponentName = {value.remoteComponentName}/>
            )
        })}
    </div>
)
}

export default DynamicComponent;