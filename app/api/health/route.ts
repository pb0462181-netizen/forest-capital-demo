import { NextResponse } from 'next/server';

export function GET(){
  return NextResponse.json({
    ok:true,
    service:'forest-capital-web',
    timestamp:new Date().toISOString()
  });
}
