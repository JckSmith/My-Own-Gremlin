import axios from 'axios';
import { useEffect } from 'react';

const updateGremlin = async (gremlin: any) => {
  if (gremlin.hunger > 0 || gremlin.satisfaction > 0) {
    axios.put(`http://[::1]:3000/gremlins/${gremlin.id}`, {
      hunger: Math.max(0, gremlin.hunger - 1),
      satisfaction: Math.max(0, gremlin.satisfaction - 1),
    });
  }
};

const useDepleteGremlin = (
  gremlins: any | any[],
  onComplete: (data: any) => void
) => {
  useEffect(() => {
    if (gremlins) {
      const timeoutId = setTimeout(async () => {
        if (Array.isArray(gremlins)) {
          for (const gremlin of gremlins) {
            await updateGremlin(gremlin);
          }
          const { data } = await axios.get('http://[::1]:3000/gremlins');
          onComplete(data);
        } else {
          await updateGremlin(gremlins);
          const { data } = await axios.get(
            `http://[::1]:3000/gremlins/${gremlins.id}`
          );
          onComplete(data);
        }
      }, 2000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [gremlins]);
};

export { useDepleteGremlin };
