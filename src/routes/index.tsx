import { useEffect, useState } from 'react'
import { View } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

import { Loading } from '../components/Loading'
import { SignIn } from '../screens/SignIn'

import { AppRoutes } from './app.routes'

export function Routes() {
  const [user, setUser] = useState<FirebaseAuthTypes.User>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((response) => {
      setUser(response)
      setIsLoading(false)
    })

    return subscriber
  }, [])

  if (isLoading) return <Loading />

  return (
    <View flex={1} bg="gray.600">
      <NavigationContainer>
        {user ? <AppRoutes /> : <SignIn />}
      </NavigationContainer>
    </View>
  )
}
