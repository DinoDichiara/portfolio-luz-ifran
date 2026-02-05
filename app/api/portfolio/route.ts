import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("portfolio_items")
      .select("*")
      .order("sort_order", { ascending: true })

    if (error) {
      console.error("Supabase error:", error.message)
      return NextResponse.json({ items: [] }, { status: 200 })
    }

    return NextResponse.json({ items: data ?? [] })
  } catch (err) {
    console.error("API error:", err)
    return NextResponse.json({ items: [] }, { status: 200 })
  }
}
