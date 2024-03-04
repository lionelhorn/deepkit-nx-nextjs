import {DirectClient, rpc, RpcKernel} from "@deepkit/rpc";
import { expect, test } from "vitest";

test("ad with location echoing through rpc 1", async () => {
  class GeoLatLng {
    constructor(public lat: number, public lng: number) {
    }
  }

  class GeoLocation {
    coords?: GeoLatLng;

    hasCoords() {
      return !!(this.coords?.lat && this.coords?.lng);
    }
  }

  interface AdTitleAndBasicAttributes {
    location: GeoLocation,
  }

  class ParcelSearchRequest {
    ad?: AdTitleAndBasicAttributes | null = null;
  }

  type ClassToLitteral<C> = C extends object ? {
    [K in keyof C as C[K] extends Function ? never : K]: ClassToLitteral<C[K]>
  } : C

  const search: ClassToLitteral<ParcelSearchRequest> = {
    ad: {
      location: {
        coords: {
          lat: 47.5275,
          lng: 7.3404
        }
      }
    }
  };

  @rpc.controller("RpcRealEstateController")
  class RpcRealEstateController {
    @rpc.action()
    async searchParcelsBis(input: ClassToLitteral<ParcelSearchRequest>) {
      return input;
    }
  }

  const kernel = new RpcKernel();
  kernel.registerController(RpcRealEstateController, "RpcRealEstateController");

  const client = new DirectClient(kernel);
  const rc = client.controller<RpcRealEstateController>("RpcRealEstateController");

  {
    const echoed = await rc.searchParcelsBis(search);
    expect(echoed.ad).not.toBe(undefined);
  }
});


test("ad with location echoing through rpc 2", async () => {
  class GeoLatLng {
    constructor(public lat: number, public lng: number) {
    }
  }

  class GeoLocation {
    coords?: GeoLatLng;

    hasCoords() {
      return !!(this.coords?.lat && this.coords?.lng);
    }

    setCoords(coords: GeoLatLng) {
      this.coords = coords;
    }
  }

  interface AdTitleAndBasicAttributes {
    location: GeoLocation,
  }

  class ParcelSearchRequest {
    ad?: AdTitleAndBasicAttributes | null = null;
  }

  type ClassToLitteral<C> = C extends object ? {
    [K in keyof C as C[K] extends Function ? never : K]: ClassToLitteral<C[K]>
  } : C

  const search: ClassToLitteral<ParcelSearchRequest> = {
    ad: {
      location: {
        coords: {
          lat: 47.5275,
          lng: 7.3404
        }
      }
    }
  };

  @rpc.controller("RpcRealEstateController")
  class RpcRealEstateController {
    @rpc.action()
    async searchParcelsBis(input: ClassToLitteral<ParcelSearchRequest>) {
      return input;
    }
  }

  const kernel = new RpcKernel();
  kernel.registerController(RpcRealEstateController, "RpcRealEstateController");

  const client = new DirectClient(kernel);
  const rc = client.controller<RpcRealEstateController>("RpcRealEstateController");

  {
    const echoed = await rc.searchParcelsBis(search);
    expect(echoed.ad).not.toBe(undefined);
  }
});
