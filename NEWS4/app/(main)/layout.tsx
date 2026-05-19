import Navbar from '@/components/layout/Navbar'
import BreakingNewsTicker from '@/components/layout/BreakingNewsTicker'
import CategoryNav from '@/components/news/CategoryNav'
import Footer from '@/components/layout/Footer'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <BreakingNewsTicker />
      <CategoryNav />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}
