"use client"
import { useSession } from 'next-auth/react'
import StreamView from '@/app/components/StreamView'
import { Redirect } from '../components/Redirect';


export default function Component() {
   const creatorId = "e7f91db0-f361-49c0-ae02-34d3e78dea76"

    return <StreamView creatorId={creatorId} playVideo={true} />;
}

export const dynamic = 'auto'