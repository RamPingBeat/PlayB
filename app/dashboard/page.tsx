"use client"
import { useSession } from 'next-auth/react'
import StreamView from '@/app/components/StreamView'
import { Redirect } from '../components/Redirect';


export default function Component() {
   const creatorId = "41b2b41f-66ef-49a7-9fdc-41dc59c582ec"

    return <StreamView creatorId={creatorId} playVideo={true} />;
}

export const dynamic = 'auto'