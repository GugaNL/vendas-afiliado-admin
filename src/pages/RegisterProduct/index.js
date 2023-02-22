import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Puff } from "react-loader-spinner";
import {
  Container,
  Content,
  FieldContent,
  PreviewBtn,
  ImagePathUrl,
  ContainerImagesUpload,
  BtnConfirm,
  ContainerTicket,
  ContentLoader,
  EmptyErrorText,
  IframeUrlText,
  FieldContentCheckbox,
  ContentRadios,
} from "./styles";
import { CheckAuthContext } from "../../contexts";
import ContentHeader from "../../components/ContentHeader";
import { PAGE_LIST_PRODUCTS } from "../../constants";
import {
  newProduct,
  updateProduct,
  listCategories,
  findProduct,
} from "../../services/api";

const RegisterProduct = () => {
  const { setIsLogged } = useContext(CheckAuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const productToEdit = searchParams.get("productToEdit") || null;
  const [values, setValues] = useState({
    id: null,
    title: "",
    brand: "",
    store: "",
    linkAfiliate: "",
    categoryId: "",
    oldPrice: "",
    newPrice: "",
    discount: "",
    obs1: "",
    obs2: "",
    iframeUrl: "",
    imagePath: "",
    imgUrlTag1: "",
    imgUrlTag2: "",
    imgUrlTag3: "",
  });
  const [categoryErrorMsg, setCategoryErrorMsg] = useState("");
  const [titleErrorMsg, setTitleErrorMsg] = useState("");
  const [isImgUrlWithTags, setIsImgUrlWithTags] = useState(false);
  const [isPromotion, setIsPromotion] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const loadProduct = async () => {
    setLoading(true);
    const response = await findProduct(productToEdit);
    const { data: responseFindProduct = {} } = response;
    if (responseFindProduct && responseFindProduct.success) {
      const { product = {} } = responseFindProduct;
      setValues({
        id: product.id || null,
        title: product.title || "",
        brand: product.brand || "",
        store: product.store || "",
        linkAfiliate: product.linkAfiliate || "",
        categoryId: product.categoryId || "",
        oldPrice: product.oldPrice || "",
        newPrice: product.newPrice || "",
        discount: product.discount || "",
        obs1: product.obs1 || "",
        obs2: product.obs2 || "",
        iframeUrl: product.iframeUrl || "",
        imagePath: product.imagePath,
        imgUrlTag1: product.imgUrlTag1 || "",
        imgUrlTag2: product.imgUrlTag2 || "",
        imgUrlTag3: product.imgUrlTag3 || "",
      });
      if (product.imgUrlTag1 || product.imgUrlTag2 || product.imgUrlTag3) {
        setIsImgUrlWithTags(true);
      }
      setLoading(false);
    } else {
      toast.error("Falha ao carregar o produto", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    }
  };

  const loadCategories = useCallback(async () => {
    const response = await listCategories();
    const { data: responseCategories = {} } = response;
    if (responseCategories && responseCategories.success) {
      const { categories = [] } = responseCategories;
      categories.unshift({ id: "", name: "Selecione uma categoria" });
      setCategories(categories);
    } else {
      if (response === 401) {
        setIsLogged();
      } else {
        toast.error("Falha ao listar as categorias", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
      }
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    if (productToEdit) {
      loadProduct();
    }
  }, [productToEdit]);

  const onChangeInput = (element) => {
    const inputName = element.name;
    const inputValue = element.value;

    setValues({ ...values, [inputName]: inputValue });
  };

  const saveProduct = async () => {
    if (!values.title) {
      return setTitleErrorMsg("Nome obrigatório");
    }

    if (!values.categoryId) {
      return setCategoryErrorMsg("Categoria obrigatória");
    }

    setLoading(true);
    const payload = {
      ...values,
    };

    if (!values.id) {
      const response = await newProduct(payload);
      const { data: responseSaveProduct = {} } = response;
      if (responseSaveProduct && responseSaveProduct.success) {
        showToast("Produto criado com sucesso", "success");
        setTimeout(() => {
          setLoading(false);
          navigate(PAGE_LIST_PRODUCTS);
        }, 2500);
      } else {
        setLoading(false);
        if (response === 401) {
          setIsLogged();
        } else {
          showToast("Falha ao tentar cadastrar o produto", "error");
        }
      }
    } else {
      const response = await updateProduct(payload);
      const { data: responseUpdateProduct = {} } = response;
      if (responseUpdateProduct && responseUpdateProduct.success) {
        setLoading(false);
        showToast("Produto alterado com sucesso", "success");
        setTimeout(() => {
          navigate(PAGE_LIST_PRODUCTS);
        }, 2500);
      } else {
        setLoading(false);
        if (response === 401) {
          setIsLogged();
        } else {
          showToast("Falha ao tentar alterar o produto", "error");
        }
      }
    }
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
            {titleErrorMsg && <EmptyErrorText>{titleErrorMsg}</EmptyErrorText>}
          </FieldContent>

          <ContentRadios>
            <div>
              <label>
                <input
                  type="radio"
                  value="imgUrlWithoutTags"
                  checked={!isImgUrlWithTags ? true : false}
                  name="imgUrl"
                  onChange={() => setIsImgUrlWithTags(false)}
                />{" "}
                Url simples
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="imgUrlWithTags"
                  name="imgUrl"
                  checked={isImgUrlWithTags ? true : false}
                  onChange={() => setIsImgUrlWithTags(true)}
                />{" "}
                Url com tags
              </label>
            </div>
          </ContentRadios>

          {isImgUrlWithTags ? (
            <>
              <FieldContent>
                <label>Url da primeira tag</label>
                <IframeUrlText
                  id="iptImgUrlTag1Field"
                  name="imgUrlTag1"
                  autoCapitalize="words"
                  value={values.imgUrlTag1 || ""}
                  rows={5}
                  onChange={(event) => onChangeInput(event.target)}
                />
              </FieldContent>
              <FieldContent>
                <label>Url da segunda tag</label>
                <IframeUrlText
                  id="iptImgUrlTag1Field"
                  name="imgUrlTag2"
                  autoCapitalize="words"
                  value={values.imgUrlTag2 || ""}
                  rows={4}
                  onChange={(event) => onChangeInput(event.target)}
                />
              </FieldContent>
              <FieldContent>
                <label>Url da terceira tag</label>
                <IframeUrlText
                  id="iptImgUrlTag3Field"
                  name="imgUrlTag3"
                  autoCapitalize="words"
                  value={values.imgUrlTag3 || ""}
                  rows={3}
                  onChange={(event) => onChangeInput(event.target)}
                />
              </FieldContent>
            </>
          ) : (
            <FieldContent>
              <label>Url da imagem</label>
              <IframeUrlText
                id="iptImagePathField"
                name="imagePath"
                autoCapitalize="words"
                value={values.imagePath || ""}
                rows={4}
                onChange={(event) => onChangeInput(event.target)}
              />
            </FieldContent>
          )}

          <FieldContent>
            <label>Link de redirecionamento</label>
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

          <FieldContent>
            <label>Categoria</label>
            <select
              name="categoryId"
              value={values.categoryId}
              onChange={(evt) => onChangeInput(evt.target)}
            >
              {categories.length > 0 &&
                categories.map((item, index) => (
                  <option
                    value={item.id}
                    key={index}
                    //selected={item.name === values.categoryId}
                  >
                    {item.name}
                  </option>
                ))}
            </select>
            {categoryErrorMsg && (
              <EmptyErrorText>{categoryErrorMsg}</EmptyErrorText>
            )}
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

          <FieldContentCheckbox>
            <label>Promoção</label>
            <input
              id="iptPromotionField"
              name="promotion"
              type="checkbox"
              checked={isPromotion}
              onChange={() => setIsPromotion(!isPromotion)}
            />
          </FieldContentCheckbox>

          {!isPromotion ? (
            <FieldContent>
              <label>Preço</label>
              <input
                id="iptOldPriceField"
                name="oldPrice"
                type="text"
                pattern="[0-9]*"
                className="input-price"
                value={values.oldPrice || ""}
                onChange={(event) => onChangeInput(event.target)}
              />
            </FieldContent>
          ) : (
            <>
              <ContainerTicket>
                <FieldContent>
                  <label>Preço antigo</label>
                  <input
                    id="iptOldPriceField"
                    name="oldPrice"
                    type="text"
                    pattern="[0-9]*"
                    className="input-price"
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
                    className="input-price"
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
            </>
          )}

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

          <FieldContent>
            <label>Url do Iframe</label>
            <IframeUrlText
              id="iptIframeUrlField"
              name="iframeUrl"
              autoCapitalize="words"
              value={values.iframeUrl || ""}
              rows={5}
              onChange={(event) => onChangeInput(event.target)}
            />
          </FieldContent>

          <BtnConfirm>
            <button onClick={() => saveProduct()}>
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
