import { Form, ActionFunction, useActionData } from 'remix'
import AlertText from '~/components/alert-text'
import Button from '~/components/button'
import Input from '~/components/input'
import { createUserSession, login } from '~/utils/session.server'

type ActionData = {
  formError?: string
  fieldErrors?: {
    username: string | undefined
    password: string | undefined
  }
  fields?: {
    username: string
    password: string
  }
}

function validateUsername(username: unknown) {
  if (typeof username !== 'string' || username.length < 3) {
    return `Usernames must be at least 3 characters long`
  }
}

function validatePassword(password: unknown) {
  if (typeof password !== 'string' || password.length < 5) {
    return `Passwords must be at least 5 characters long`
  }
}

export const action: ActionFunction = async ({
  request,
}): Promise<Response | ActionData> => {
  let body = await request.formData()
  const username = body.get('username')
  const password = body.get('password')

  if (typeof username !== 'string' || typeof password !== 'string') {
    return { formError: `Form not submitted correctly.` }
  }

  let fields = { username, password }

  let fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password),
  }

  if (Object.values(fieldErrors).some(Boolean)) return { fieldErrors, fields }

  const user = await login({ username, password })

  if (!user) {
    return {
      formError: `Username/Password combination is incorrect`,
    }
  }
  return createUserSession(user.id, '/page-builder')
}

export default function Login() {
  let actionData = useActionData<ActionData | undefined>()
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-screen-sm w-full p-6 bg-gray-900 rounded">
        <h2 className="text-xl font-bold text-white mb-4 text-center">Login</h2>
        <Form
          method="post"
          aria-describedby={
            actionData?.formError ? 'form-error-message' : undefined
          }
          className="flex flex-col space-y-4"
        >
          <Input
            name="username"
            type="text"
            aria-invalid={Boolean(actionData?.fieldErrors?.username)}
            aria-describedby={
              actionData?.fieldErrors?.username ? 'username-error' : undefined
            }
          />
          {actionData?.fieldErrors?.username ? (
            <AlertText id="username-error">
              {actionData?.fieldErrors.username}
            </AlertText>
          ) : null}
          <Input
            name="password"
            type="password"
            aria-invalid={
              Boolean(actionData?.fieldErrors?.password) || undefined
            }
            aria-describedby={
              actionData?.fieldErrors?.password ? 'password-error' : undefined
            }
          />
          {actionData?.fieldErrors?.password ? (
            <AlertText id="password-error">
              {actionData?.fieldErrors.password}
            </AlertText>
          ) : null}
          <div id="form-error-message">
            {actionData?.formError ? (
              <AlertText className="text-center">
                {actionData?.formError}
              </AlertText>
            ) : null}
          </div>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </div>
  )
}
