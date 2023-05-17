import { useRouter } from "next/router";
import PreloginLib from "../features/cdx-prelogin/preloginlib";
import DynamicComponent from "../src/routes/DynamicComponent";

function RoutingComponent () {
    let pageName = 'default';

    const router = useRouter();
    const params = router.query.params;
    let pathName = "/"
    pageName = params ? params[params?.length-1] : pageName;
    console.log("pageName", pageName)
    return (<>
    {/* <PreloginLib></PreloginLib> */}
    <DynamicComponent pageName = {pageName}/>
    </>)

}

export default RoutingComponent;