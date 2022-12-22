import dynamic from "next/dynamic";

const Map2 = dynamic(() => import('./Map2'),{
    ssr: false
});

export default Map2