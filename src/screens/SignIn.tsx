import { useState } from 'react'
import { Alert } from 'react-native'
import { Heading, Icon, useTheme, VStack } from 'native-base'
import { Envelope, Key } from 'phosphor-react-native'

import auth from '@react-native-firebase/auth'

import { Input } from '../components/Input'
import { Button } from '../components/Button'

import Logo from '../assets/logo_primary.svg'

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { colors } = useTheme()

  function handleSignIn() {
    if (!email || !password) {
      return Alert.alert('Entrar', 'Informe e-mail e senha.')
    }

    setIsLoading(true)

    auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        if (error.code === 'auth/invalid-email') {
          return Alert.alert('Entrar', 'E-mail inválida.')
        }

        if (error.code === 'auth/invalid-login') {
          return Alert.alert('Entrar', 'E-mail ou senha inválida.')
        }

        return Alert.alert('Entrar', 'Não foi possível acessar.')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />

      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <Input
        mb={4}
        placeholder="E-mail"
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
        }
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
      />

      <Input
        mb={8}
        placeholder="Senha"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <Button
        title="Entrar"
        w="full"
        isLoading={isLoading}
        onPress={handleSignIn}
      />
    </VStack>
  )
}
