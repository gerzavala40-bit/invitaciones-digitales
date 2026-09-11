import { NextRequest, NextResponse } from 'next/server';
import { suggestTemplates } from '@/lib/template-suggester';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'boda';
  
  const suggestions = suggestTemplates(type);
  
  return NextResponse.json({ success: true, suggestions });
}
