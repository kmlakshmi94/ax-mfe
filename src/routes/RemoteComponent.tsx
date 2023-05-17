import React, { Suspense } from "react";
import { fetchRemoteComponentfromUrl } from "./remote-module-loader";
import PreloginLib from "../../features/cdx-prelogin/preloginlib";

function RemoteComponent (props: any
    ) {
       
      let remoteComponentUrl = "http://localhost:3000//bundles/prelogin/react-prelogin.js ";
      console.log('props.remoteComponentName', props.remoteComponentName, remoteComponentUrl);
      const RemoteComp = React.lazy(
        () => fetchRemoteComponentfromUrl(props.remoteComponentName, remoteComponentUrl)
        .then ((comp: any) => {
          console.log(comp);
          return {default: comp}
        })
      )  
    return (
        <>
        <Suspense>
        <RemoteComp {...props}/>
        </Suspense>
       
       
         {/* <PreloginLib></PreloginLib> */}
        </> 
    )
}

export default RemoteComponent;