export function asap( fn: () => void ) {
  setTimeout(fn,1);
}

export function clone<T>( v: T ) {
  if (!v) return v;
  if (Array.isArray(v)) return (v as any).map(clone);
  if (v instanceof Date) return new Date((v as any).getTime());
  if (typeof v === 'object') {
    var ret: any = {};
    Object.keys(v as any).forEach( function(p) {
      ret[p] = clone((v as any)[p]);
    });
    return ret;
  }
  return v;
}
