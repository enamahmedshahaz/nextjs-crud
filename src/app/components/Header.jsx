import Link from 'next/link';
import React from 'react';

const Header = () => {


    return (

        <div className='flex justify-between bg-red-400 px-5 py-4'>
            <div>
                <Link href="/">
                    <h1 className='text-2xl font-semibold text-teal-400'> NextJs <span className='text-indigo-500'>CRUD</span></h1>
                </Link>
            </div>

            <div className='flex justify-between gap-4'>

                <Link href="/">Products list</Link>

                <Link href="/create">Create product</Link>

            </div>
        </div>
    );
};

export default Header;