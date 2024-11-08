import { Link, useLocation } from 'react-router-dom'

const Breadcrumb: React.FC = () => {
  const location = useLocation()

  // Split the pathname into an array for generating breadcrumb links
  const pathnames = location.pathname.split('/').filter((x) => x)

  return (
    <div className="mb-4 text-sm" aria-label="breadcrumb">
      <ol className="flex space-x-2">
        <li>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`

          // If it's the last breadcrumb, don't make it a link
          return index === pathnames.length - 1 ? (
            <li key={to} className="text-gray-500">
              / {value.charAt(0).toUpperCase() + value.slice(1)}
            </li>
          ) : (
            <li key={to}>
              <Link to={to} className="text-gray-500">
                /{' '}
                <span className="hover:underline">
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </span>
              </Link>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default Breadcrumb
