import React from 'react'
import { InfinitySpin } from 'react-loader-spinner'
export default function Loader() {
    return (
        <>
            <InfinitySpin visible={true}
                height="600"
                width="600"
                color="#F68D89"
                ariaLabel="rotating-square-loading" 
            />
        </>
    )
}
