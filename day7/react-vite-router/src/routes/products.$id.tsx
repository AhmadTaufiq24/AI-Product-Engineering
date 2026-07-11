import { createFileRoute } from '@tanstack/react-router'

interface Product {
  id: number
  title: string
  price: number
  image: string
  description: string
}

export const Route = createFileRoute('/products/$id')({
  component: RouteComponent, loader: async (contexts) => {
    console.log(contexts.params.id)
    const response = await fetch(`https://fakestoreapi.com/products/${contexts.params.id}`)  
    
    const product = await response.json()
    return product as Product
  }
})

function RouteComponent() {
  const product = Route.useLoaderData()
  return <div>
    <div>{product.id}</div>
    <div>{product.title}</div>
    <div>{product.price}</div>
  </div>  
}
