import React from 'react'
import { auth } from '../firebase';

const Feed = () => {
    return (
        <div>
            <button onClick={async() => await auth.signOut()}>ログアウト</button>
        </div>
    )
}

export default Feed
