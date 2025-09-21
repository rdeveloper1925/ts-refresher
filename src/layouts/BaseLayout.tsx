
import AppleStyleDock from "@/components/mine/AppleSyleDock";
import type React from "react";

const BaseLayout = (props:Props) =>{
    console.log('rpos', props);
    return (
        <div>
            {props.children}
            <AppleStyleDock/>
        </div>
    );
}

interface Props {
  children: React.ReactNode
}

export default BaseLayout;
