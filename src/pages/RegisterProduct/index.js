import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Puff } from "react-loader-spinner";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import {
  Container,
  Content,
  FieldContent,
  ContentUploadImage,
  BtnDeleteImg,
  ContainerImagesUpload,
  BtnConfirm,
  ContainerTicket,
  ContentLoader,
} from "./styles";
import { CheckAuthContext } from "../../contexts";
import ContentHeader from "../../components/ContentHeader";
import { ImageTypeRegex, baseURL } from "../../constants";
import {
  newPrizeDraw,
  findPrizeDraw,
  updatePrizeDraw,
  updateImages,
} from "../../services/api";

const RegisterProduct = () => {
  const { setIsLogged } = useContext(CheckAuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productToEdit = searchParams.get("productToEdit") || null;
  const [values, setValues] = useState({
    id: null,
    title: "",
    brand: "",
    store: "",
    linkAfiliate: "",
    category: "",
    oldPrice: "",
    newPrice: "",
    discount: "",
    obs1: "",
    obs2: "",
    productImage: [],
  });
  const [uploadedImages, setUploadedImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();

  const showToast = (message, type) => {
    if (type === "success") {
      toast.success(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    } else {
      toast.error(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    }
  };

  const loadPrizeDescription = (prizeDescription) => {
    // const arrayDesc = prizeDescription?.split(";") || [];
    // const formattedArrayDesc =
    //   arrayDesc.map((item, index) => {
    //     return { id: index + 1, desc: item };
    //   }) || [];
    // return formattedArrayDesc;
  };

  const loadPrizeDraw = async () => {
    // setLoading(true);
    // const response = await findPrizeDraw(prizeDrawToEdit);
    // const { data: responseFindPrizeDraw = {} } = response;
    // if (responseFindPrizeDraw && responseFindPrizeDraw.success) {
    //   const { sorteio = {}, imagens = [] } = responseFindPrizeDraw;
    //   let prizeDate = "";
    //   let prizeTime = "";

    //   const prizeDescriptionFormatted = loadPrizeDescription(
    //     sorteio.descricao
    //   ) || [{ id: 1, desc: "" }];

    //   if (sorteio.data) {
    //     sorteio.data = new Date(sorteio.data).toLocaleString("pt-BR");
    //     prizeDate = sorteio.data.split(" ")[0];
    //     prizeTime = sorteio.data.split(" ")[1];
    //   }

    //   const formattedImages = imagens.map((el) => {
    //     return el.path;
    //   });

    //   setValues({
    //     id: sorteio.id,
    //     title: sorteio.titulo,
    //     prize: sorteio.premio,
    //     datePrizeDraw: prizeDate,
    //     timePrizeDraw: prizeTime,
    //     prizeDescription: prizeDescriptionFormatted,
    //     ticketValue: sorteio.valorBilhete,
    //     ticketQuantity: sorteio.totalBilhetes,
    //   });
    //   setUploadedImages(formattedImages);
    //   setLoading(false);
    // } else {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    if (productToEdit) {
      loadPrizeDraw();
    }
  }, [productToEdit]);

  const onChangeInput = (element, descId = null) => {
    const inputName = element.name;
    const inputValue = element.value;

    setValues({ ...values, [inputName]: inputValue });
  };

  useEffect(() => {
    if (imageFiles.length < 1) return;

    const newImageUrls = [];
    newImageUrls.push(URL.createObjectURL(imageFiles[0]))
    setValues({
      productImage: newImageUrls
    })
  }, [imageFiles]);

  const onImageChange = (evt) => {
    const { files = [] } = evt;
    if (files.length > 0 && files[0].type.match(ImageTypeRegex)) {
      return setImageFiles([files[0]]);
    }
    alert("Apenas arquivos .jpeg ou .png");
  };

  const removeImage = (isUploadedImage = false) => {
    if (isUploadedImage) {
      let arrayAuxImages = uploadedImages;
      arrayAuxImages.splice(0, 1);
      setUploadedImages([...arrayAuxImages]);
    } else {
      setImageFiles([]);
      setValues({ productImage: []})
    }
  };

  const mountPrizeDesc = (desc) => {

  };

  const savePrizeDraw = async () => {
   
  };

  return (
    <Container>
      {loading && (
        <ContentLoader>
          <Puff
            height="200"
            width="200"
            radisu={1}
            color="#4fa94d"
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </ContentLoader>
      )}
      <ContentHeader
        title={values.id ? "Editar Produto" : "Novo Produto"}
        showFilters={false}
      />
      <Content>
        <>
          <FieldContent>
            <label>Nome</label>
            <input
              id="iptTitleField"
              name="title"
              type="text"
              autoCapitalize="words"
              className="input-title"
              value={values.title || ""}
              onChange={(event) => onChangeInput(event.target)}
            />
          </FieldContent>

          <FieldContent>
            <label>Link</label>
            <input
              id="iptLinkAfiliateField"
              name="linkAfiliate"
              type="text"
              autoCapitalize="words"
              className="input-linkAfiliate"
              value={values.linkAfiliate || ""}
              onChange={(event) => onChangeInput(event.target)}
            />
          </FieldContent>

          <ContainerTicket>
            <FieldContent>
              <label>Marca</label>
              <input
                id="iptBrandField"
                name="brand"
                type="text"
                autoCapitalize="words"
                className="input-brand"
                value={values.brand || ""}
                onChange={(event) => onChangeInput(event.target)}
              />
            </FieldContent>
            <FieldContent>
              <label>Loja</label>
              <input
                id="iptStoreField"
                name="store"
                type="text"
                autoCapitalize="words"
                className="input-store"
                value={values.store || ""}
                onChange={(event) => onChangeInput(event.target)}
              />
            </FieldContent>
          </ContainerTicket>

          <ContainerImagesUpload>
            {values.productImage.length > 0 && (
              <ContentUploadImage>
                <img src={values.productImage} alt="imagem para upload" />
                <BtnDeleteImg onClick={() => removeImage(false)}>
                  <MdDelete />
                </BtnDeleteImg>
              </ContentUploadImage>
            )}
          </ContainerImagesUpload>


          <FieldContent>
            <label>Imagem</label>
            <input
              id="iptPrizeImageField"
              name="prizeImage"
              type="file"
              accept="image/*"
              multiple
              onChange={(evt) => onImageChange(evt.target)}
              hidden
              ref={fileRef}
            />
            <button
              className="btn-upload"
              onClick={() => fileRef.current.click()}
            >
              <MdCloudUpload />
            </button>
          </FieldContent>

          <ContainerTicket>
            <FieldContent>
              <label>Preço antigo</label>
              <input
                id="iptOldPriceField"
                name="oldPrice"
                type="text"
                pattern="[0-9]*"
                className="input-oldprice"
                value={values.oldPrice || ""}
                onChange={(event) => onChangeInput(event.target)}
              />
            </FieldContent>
            <FieldContent>
              <label>Preço novo</label>
              <input
                id="iptNewPriceField"
                name="newPrice"
                type="text"
                //pattern='[0-9]'
                className="input-newprice"
                value={values.newPrice || ""}
                onChange={(event) => onChangeInput(event.target)}
              />
            </FieldContent>
          </ContainerTicket>

          <FieldContent>
            <label>Desconto</label>
            <input
              id="iptDiscountField"
              name="discount"
              type="text"
              autoCapitalize="words"
              className="input-discount"
              value={values.discount || ""}
              onChange={(event) => onChangeInput(event.target)}
            />
          </FieldContent>

          <FieldContent>
            <label>Observação 1</label>
            <input
              id="iptObs1Field"
              name="obs1"
              type="text"
              autoCapitalize="words"
              className="input-obs"
              value={values.obs1 || ""}
              onChange={(event) => onChangeInput(event.target)}
            />
          </FieldContent>

          <FieldContent>
            <label>Observação 2</label>
            <input
              id="iptObs2Field"
              name="obs2"
              type="text"
              autoCapitalize="words"
              className="input-obs"
              value={values.obs2 || ""}
              onChange={(event) => onChangeInput(event.target)}
            />
          </FieldContent>

          <BtnConfirm>
            <button onClick={() => savePrizeDraw()}>
              {values.id ? "Salvar" : "Criar"}
            </button>
          </BtnConfirm>
        </>
      </Content>
      <ToastContainer />
    </Container>
  );
};

export default RegisterProduct;
