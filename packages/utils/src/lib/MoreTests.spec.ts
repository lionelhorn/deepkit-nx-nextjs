import {DirectClient, rpc, RpcKernel} from "@deepkit/rpc";
import {expect, test} from "vitest";

test("mj parcel search via rpc deserialization", async () => {
  class GeoLatLng {
    constructor(public lat: number, public lng: number) {
    }
  }

  class GeoLocation {
    locality?: string;
    postalCode?: string;
    coords?: GeoLatLng

    hasCoords() {
      return true;
    }

    setCoords(coords: GeoLatLng) {
      this.coords = coords;
    }
  }

  interface AdTitleAndBasicAttributes {
    title: string;
    attributes: {
      plotSurface?: number,
      buildingSurface: number,
      ges?: string,
      energyRate?: string,
    };
    location: GeoLocation,
  }

  class ParcelSearchRequest {
    adUrl: string = "";
    originalAd?: AdTitleAndBasicAttributes | null = null;
    ad?: AdTitleAndBasicAttributes | null = null;
  }


  type ToDTO<C> = C extends object ? {
    [K in keyof C as C[K] extends Function ? never : K]: ToDTO<C[K]>
  } : C

  type PSRDto = ToDTO<ParcelSearchRequest>;

  const search: PSRDto = {
    "adUrl": "https://www.leboncoin.fr/offre/ventes_immobilieres/123456789",
    "ad": {
      "title": "abc",
      "attributes": {
        "buildingSurface": 120,
        "plotSurface": 183,
        "energyRate": "E",
        "ges": "B"
      },
      "location": {
        "locality": "Paris",
        "postalCode": "75000",
      }
    }
  };

  class RpcRealEstateController {
    @rpc.action()
    async searchParcelsBis(input: PSRDto) {
      expect(input.ad!.title).toBe("abc")
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
