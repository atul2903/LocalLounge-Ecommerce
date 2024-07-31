import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link, useLoaderData, useLocation } from 'react-router-dom'

const PageNotFound = () => {
    

    return (
        <div>  <Layout>
            <div className='pnf'>
                <h1 className='pnf-title'>404</h1>
                <h2 className='pnf-heading'> Oops! Page Not Found</h2>
                <Link to='/' className='pnf-btn'>Go Back</Link>
            </div>
        </Layout>
        </div>
    )
}

export default PageNotFound