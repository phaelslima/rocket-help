import { NavigationContainer } from '@react-navigation/native'
import { View } from 'native-base'

import { SignIn } from '../screens/SignIn'
import { AppRoutes } from './app.routes'

export function Routes() {
  return (
    <View flex={1} bg="gray.600">
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </View>
  )
}
