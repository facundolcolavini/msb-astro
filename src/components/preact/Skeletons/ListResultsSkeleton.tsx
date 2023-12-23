import { h } from 'preact';
import CardSkeletonSearch from '../../CardSkeletonSearch.astro';
import CardResultSkeleton from './CardResultSkeleton';


function ListResultsSkeleton( ) {

  return (
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4"
    >
      {
        [1,2,3,4,5,6,7,8,9,10]?.map((i) => (
          <div>
            <CardResultSkeleton  />
          </div>
        ))
      }
    </div>
  );
}

export default ListResultsSkeleton;