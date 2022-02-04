import { NavLink } from 'remix'
import { ROUTES } from '~/constants/routes'
import LeafIcon from '../leaf-icon'

export default function Header() {
  return (
    <header className="p-2 border-b-2">
      <ul className="grid grid-cols-12 items-center ">
        <li className="col-span-4">
          <LeafIcon height="48" width="48" className="transform rotate-45" />
        </li>
        <li className="justify-self-center">
          <NavLink to={ROUTES.pageBuilder}>Pages</NavLink>
        </li>
        <li className="col-start-12 justify-self-center">
          <p>Account</p>
        </li>
      </ul>
    </header>
  )
}
