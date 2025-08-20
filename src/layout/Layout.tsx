import type { ReactNode } from "react"

type LayoutProps = {
  children: ReactNode
  onAdd?: () => void
  isFormOpen?: boolean
  AddFormComponent?: ReactNode
  onLogout?: () => void
}

const Layout = ({ children, onAdd, isFormOpen, AddFormComponent, onLogout }: LayoutProps) => {
  return (
    <div className="bg-gray-200 min-h-screen w-screen p-6">
      {/* Header */}
      <div className="flex justify-between mb-6">
        <div className="flex gap-4">
          {onAdd && (
            <button
              onClick={onAdd}
              className="bg-accentorange py-1 px-6 rounded-full cursor-pointer hover:text-white transition-colors duration-300"
            >
              Add new post
            </button>
          )}

          {isFormOpen && AddFormComponent}
        </div>

        {onLogout && (
          <button
            onClick={onLogout}
            className="text-red-500 text-lg cursor-pointer hover:text-black transition-colors duration-300"
          >
            Logout
          </button>
        )}
      </div>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  )
}

export default Layout
