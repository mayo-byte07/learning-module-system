import { NextRequest, NextResponse } from 'next/server'

interface GoogleUser {
  id: string
  email: string
  name?: string
  picture?: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { token?: string }
    const { token } = body

    if (!token) {
      return NextResponse.json(
        { error: 'Google token is required' },
        { status: 400 }
      )
    }

    // Verify Google token with Google's API
    const response = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${token}`)
    
    if (!response.ok) {
      console.error('Google token verification failed:', response.status, response.statusText)
      return NextResponse.json(
        { error: 'Invalid Google token' },
        { status: 401 }
      )
    }

    const googleUser = await response.json() as GoogleUser

    // Validate required fields
    if (!googleUser.id || !googleUser.email) {
      return NextResponse.json(
        { error: 'Invalid user data from Google' },
        { status: 400 }
      )
    }

    // Create user object for your application
    const user = {
      id: googleUser.id,
      name: googleUser.name || googleUser.email.split('@')[0],
      email: googleUser.email,
      picture: googleUser.picture,
      provider: 'google'
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Google auth error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
