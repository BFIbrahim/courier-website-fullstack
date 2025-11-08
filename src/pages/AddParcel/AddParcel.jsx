import React, { useMemo, useEffect } from "react";
import { useLoaderData } from "react-router";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const calculateDeliveryCharge = (isDocument, weight, isWithinCity) => {
  const parcelWeight = Number(weight) || 0;
  let baseRate = 0;
  let additionalCharge = 0;
  let totalCharge = 0;

  if (isDocument) {
    baseRate = isWithinCity ? 60 : 80;
    totalCharge = baseRate;
  } else {
    baseRate = isWithinCity ? 110 : 150;

    if (parcelWeight > 3) {
      const excessWeight = parcelWeight - 3;
      additionalCharge = Math.ceil(excessWeight) * 40;
    }
    totalCharge = baseRate + additionalCharge;
  }

  return {
    baseCharge: baseRate,
    additionalCharge: additionalCharge,
    totalCharge: totalCharge,
    deliveryZone: isWithinCity ? "Within City" : "Outside City",
  };
};

const processWarehouseData = (data) => {
  const regions = {};
  data.forEach((item) => {
    if (!regions[item.region]) {
      regions[item.region] = [];
    }
    regions[item.region].push(item.district);
  });
  return regions;
};

const generateTrackingId = () => {
  return 'TRK-' + Math.random().toString(36).substring(2, 12).toUpperCase();
};


const AddParcel = () => {
  const allWarehouses = useLoaderData();

  const { user } = useAuth();
  const userEmail = user?.email || "unknown@example.com";

  const axiosSecure = useAxiosSecure()

  const processedData = useMemo(() => processWarehouseData(allWarehouses), [allWarehouses]);
  const regionNames = Object.keys(processedData);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      senderWarehouse: regionNames[0] || "",
      receiverWarehouse: regionNames[0] || "",
      isDocument: "true",
      parcelWeight: "",
    }
  });

  const isDocumentWatch = watch('isDocument');
  const senderDistrictWatch = watch('senderDistrict');
  const receiverDistrictWatch = watch('receiverDistrict');
  const senderWarehouseWatch = watch('senderWarehouse');
  const receiverWarehouseWatch = watch('receiverWarehouse');

  const isDocument = isDocumentWatch === "true";
  const senderWarehouse = senderWarehouseWatch;
  const receiverWarehouse = receiverWarehouseWatch;

  const senderDistricts = processedData[senderWarehouse] || [];
  const receiverDistricts = processedData[receiverWarehouse] || [];

  useEffect(() => {
    if (senderWarehouse && !senderDistricts.includes(senderDistrictWatch)) {
      setValue("senderDistrict", "");
    }
  }, [senderWarehouse, senderDistricts, senderDistrictWatch, setValue]);

  useEffect(() => {
    if (receiverWarehouse && !receiverDistricts.includes(receiverDistrictWatch)) {
      setValue("receiverDistrict", "");
    }
  }, [receiverWarehouse, receiverDistricts, receiverDistrictWatch, setValue]);

  const onSubmit = (data) => {
    const isWithinCity = data.senderDistrict === data.receiverDistrict;

    const chargeDetails = calculateDeliveryCharge(
      data.isDocument === "true",
      data.parcelWeight,
      isWithinCity
    );
    const finalCharge = chargeDetails.totalCharge;
    const parcelType = data.isDocument === "true" ? "Document" : "Non-Document";
    const deliveryZone = chargeDetails.deliveryZone;

    const confirmBooking = () => {
      toast.dismiss(confirmationToastId);

      const trackingId = generateTrackingId();
      const addedAt = new Date().toISOString();

      const finalParcelData = {
        ...data,
        isDocument: data.isDocument === "true",
        parcelWeight: Number(data.parcelWeight),
        userEmail: userEmail,
        trackingId: trackingId,
        deliveryCharge: finalCharge,
        deliveryZone: deliveryZone,
        baseCharge: chargeDetails.baseCharge,
        additionalCharge: chargeDetails.additionalCharge,
        addedAt: addedAt,
        status: "Pending Pickup",
      };

      console.log("Final Parcel Data to Save (Ready for API):", finalParcelData);

      axiosSecure.post('/parcels', finalParcelData)
        .then(res => {
          console.log(res.data)
          if (res.data.insertedId) {
            toast.success(`Parcel Added Successfully! Tracking ID: ${trackingId}`, {
              duration: 5000
            });
          }
        })
        .catch(err => {
          console.error(err)
        })
    };

    const backToEdit = (tId) => {
      toast.dismiss(tId);
    };

    const confirmationToastId = toast((t) => (
      <div className="text-center p-4 w-80">
        <h3 className="text-xl font-bold mb-3 text-secondary">Confirm Parcel Details </h3>
        <div className="text-left mb-4 space-y-1">
          <p><span className="font-semibold">Parcel Type:</span> {parcelType}</p>
          <p><span className="font-semibold">Delivery Zone:</span> {deliveryZone}</p>
          <p><span className="font-semibold">Weight:</span> {data.parcelWeight} KG</p>
          <hr className="my-1 border-gray-300" />
          <p><span className="font-semibold">Base Charge:</span> ৳{chargeDetails.baseCharge}</p>
          <p><span className="font-semibold">Extra Charge:</span> ৳{chargeDetails.additionalCharge}</p>
          <hr className="my-1 border-gray-300" />
        </div>

        <p className="mb-4 text-xl font-extrabold text-lime-600">
          Total Charge: ৳{finalCharge}
        </p>

        <div className="flex justify-center flex-col space-y-2">
          <button
            onClick={confirmBooking}
            className="btn btn-sm btn-success text-white bg-lime-600 hover:bg-lime-700 border-none"
          >
            Proceed to Add Parcel
          </button>
          <button
            onClick={() => backToEdit(t.id)}
            className="btn btn-sm btn-ghost text-gray-600 border-none hover:bg-gray-200"
          >
            Back to Edit
          </button>
        </div>
      </div>
    ), {
      duration: Infinity,
      style: {
        background: '#fff',
        color: '#000',
        padding: '0.5rem',
        border: '2px solid #CAEB66',
        maxWidth: '400px',
      }
    });
  };

  return (
    <>
      <div className="min-h-scree flex justify-center items-center p-6">
        <div className="bg-white w-full max-w-6xl rounded-2xl shadow p-8">
          <h1 className="text-4xl font-bold text-secondary mb-5 pb-2 border-b border-gray-300">
            Add Parcel
          </h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2 text-secondary">
                Enter your parcel details
              </h2>
              <div className="flex items-center space-x-6 ">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="parcelType"
                    className="radio radio-primary"
                    checked={isDocument}
                    {...register("isDocument")}
                    value="true"
                  />
                  <span>Document</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="parcelType"
                    className="radio radio-primary"
                    checked={!isDocument}
                    {...register("isDocument")}
                    value="false"
                  />
                  <span>Non-Document</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 border-b border-gray-300 pb-8">
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Parcel Name"
                  className={`input input-bordered w-full ${errors.parcelName ? 'input-error' : ''}`}
                  {...register("parcelName", { required: "Parcel Name is required" })}
                />
                {errors.parcelName && <p className="text-red-500 text-sm">{errors.parcelName.message}</p>}
              </div>

              <div className="space-y-2">
                <input
                  type="number"
                  placeholder="Parcel Weight (KG)"
                  className={`input input-bordered w-full ${errors.parcelWeight ? 'input-error' : ''}`}
                  {...register("parcelWeight", {
                    required: "Weight is required",
                    valueAsNumber: true,
                    min: { value: 0.1, message: "Weight must be greater than 0" }
                  })}
                />
                {errors.parcelWeight && <p className="text-red-500 text-sm">{errors.parcelWeight.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">

              <div>
                <h3 className="font-semibold text-lg mb-4 text-secondary">
                  Sender Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Sender Name"
                    className={`input input-bordered w-full ${errors.senderName ? 'input-error' : ''}`}
                    {...register("senderName", { required: "Sender Name is required" })}
                  />
                  {errors.senderName && <p className="text-red-500 text-sm">{errors.senderName.message}</p>}

                  <select
                    className={`select select-bordered w-full ${errors.senderWarehouse ? 'select-error' : ''}`}
                    {...register("senderWarehouse", { required: "Sender Region is required" })}
                    onChange={(e) => {
                      setValue("senderWarehouse", e.target.value);
                      setValue("senderDistrict", "");
                    }}
                  >
                    <option disabled value="">
                      Select Warehouse (Region)
                    </option>
                    {regionNames.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                  {errors.senderWarehouse && <p className="text-red-500 text-sm">{errors.senderWarehouse.message}</p>}

                  <input
                    type="text"
                    placeholder="Address"
                    className="input input-bordered w-full"
                    {...register("senderAddress")}
                  />
                  <input
                    type="text"
                    placeholder="Sender Contact No"
                    className="input input-bordered w-full"
                    {...register("senderContact")}
                  />

                  <div className="md:col-span-2 space-y-2">
                    <select
                      className={`select select-bordered w-full ${errors.senderDistrict ? 'select-error' : ''}`}
                      {...register("senderDistrict", { required: "Sender District is required" })}
                    >
                      <option disabled value="">
                        Select your region/district
                      </option>
                      {senderDistricts.map((district) => (
                        <option key={district} value={district}>
                          {district}
                        </option>
                      ))}
                    </select>
                    {errors.senderDistrict && <p className="text-red-500 text-sm">{errors.senderDistrict.message}</p>}
                  </div>

                  <textarea
                    className="textarea textarea-bordered md:col-span-2 w-full"
                    placeholder="Pickup Instruction"
                    {...register("pickupInstruction")}
                  ></textarea>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4 text-secondary">
                  Receiver Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Receiver Name"
                    className={`input input-bordered w-full ${errors.receiverName ? 'input-error' : ''}`}
                    {...register("receiverName", { required: "Receiver Name is required" })}
                  />
                  {errors.receiverName && <p className="text-red-500 text-sm">{errors.receiverName.message}</p>}

                  <select
                    className={`select select-bordered w-full ${errors.receiverWarehouse ? 'select-error' : ''}`}
                    {...register("receiverWarehouse", { required: "Receiver Region is required" })}
                    onChange={(e) => {
                      setValue("receiverWarehouse", e.target.value)
                      setValue("receiverDistrict", "")
                    }}
                  >
                    <option disabled value="">
                      Select Warehouse (Region)
                    </option>
                    {regionNames.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                  {errors.receiverWarehouse && <p className="text-red-500 text-sm">{errors.receiverWarehouse.message}</p>}

                  <input
                    type="text"
                    placeholder="Receiver Address"
                    className="input input-bordered w-full"
                    {...register("receiverAddress")}
                  />
                  <input
                    type="text"
                    placeholder="Receiver Contact No"
                    className="input input-bordered w-full"
                    {...register("receiverContact")}
                  />

                  <div className="md:col-span-2 space-y-2">
                    <select
                      className={`select select-bordered w-full ${errors.receiverDistrict ? 'select-error' : ''}`}
                      {...register("receiverDistrict", { required: "Receiver District is required" })}
                    >
                      <option disabled value="">
                        Select your region/district
                      </option>
                      {receiverDistricts.map((district) => (
                        <option key={district} value={district}>
                          {district}
                        </option>
                      ))}
                    </select>
                    {errors.receiverDistrict && <p className="text-red-500 text-sm">{errors.receiverDistrict.message}</p>}
                  </div>

                  <textarea
                    className="textarea textarea-bordered md:col-span-2 w-full"
                    placeholder="Delivery Instruction"
                    {...register("deliveryInstruction")}
                  ></textarea>
                </div>
              </div>
            </div>

            <p className="text-sm text-secondary mb-6">
              * PickUp Time 4pm–7pm Approx.
            </p>

            <div>
              <button
                type="submit"
                className="btn btn-primary text-black border-none hover:bg-lime-500"
              >
                Proceed to Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#CAEB66",
            color: "#000000",
            borderRadius: "0.5rem",
            padding: "0.5rem 1rem",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
          },
          duration: 2500
        }}
      />

    </>

  );
};

export default AddParcel;