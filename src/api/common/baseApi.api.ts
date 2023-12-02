import axios, {
  AxiosInstance,
  AxiosResponse,
  RawAxiosRequestConfig,
} from "axios";
import qs from "qs";

export abstract class BaseApi {
  readonly #instance: AxiosInstance;

  constructor(config?: RawAxiosRequestConfig) {
    this.#instance = axios.create({
      timeout: 15_000,
      maxRedirects: 5,
      paramsSerializer: {
        serialize: (value: Record<string, unknown>) =>
          qs.stringify(value, { arrayFormat: "comma" }),
      },
      ...config,
    });
  }

  /**
   * Only use this if none of this class implementations (very rare)
   * does not meet your demand.
   * @returns {AxiosInstance} instance of Axios
   */
  protected get Instance(): AxiosInstance {
    return this.#instance;
  }

  /**
   * HTTP Get Method
   * @param {string} url Resource URL
   * @param {string} accessToken Access token
   * @param {RawAxiosRequestConfig} config Additional requests configurations
   * @returns {Promise<AxiosResponse<T> | null>} Result of T
   */
  protected async tryGet<T>(
    url: string,
    accessToken?: string,
    config?: RawAxiosRequestConfig,
  ): Promise<T | null> {
    let actualConfig: RawAxiosRequestConfig | undefined;

    if (accessToken !== undefined) {
      actualConfig = {
        ...config,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
    } else {
      actualConfig = config;
    }

    const response: AxiosResponse<T> = await this.#instance.get<T>(
      url,
      actualConfig,
    );

    if (response === null) return null;
    return response.data;
  }

  /**
   * HTTP Post Method for JSON and FormData body
   * @param {string} url Resource URL
   * @param {TBody} data Data for posting
   * @param {string} accessToken Access token
   * @param {RawAxiosRequestConfig} config Additional requests configurations
   * @returns {Promise<AxiosResponse<TReturn> | null>} Result of T
   */
  protected async tryPost<TReturn, TBody = undefined>(
    url: string,
    data: TBody,
    accessToken?: string,
    config?: RawAxiosRequestConfig,
  ): Promise<TReturn | null> {
    const actualConfig: RawAxiosRequestConfig | undefined =
      this.getRequestConfig(accessToken, config);

    const response: AxiosResponse<TReturn> =
      data instanceof FormData
        ? await this.#instance.postForm<TReturn>(url, data, actualConfig)
        : await this.#instance.post<TReturn>(url, data, actualConfig);

    if (response === null) return null;
    return response.data;
  }

  /**
   * HTTP Patch Method for JSON and FormData body
   * @param {string} url Resource URL
   * @param {TBody} data Data for patching
   * @param {string} accessToken Access token
   * @param {RawAxiosRequestConfig} config Additional requests configurations
   * @returns {Promise<AxiosResponse<TReturn> | null>} Result of T
   */
  protected async tryPatch<TReturn, TBody = undefined>(
    url: string,
    data: TBody,
    accessToken?: string,
    config?: RawAxiosRequestConfig,
  ): Promise<TReturn | null> {
    const actualConfig: RawAxiosRequestConfig | undefined =
      this.getRequestConfig(accessToken, config);

    const response: AxiosResponse<TReturn> =
      data instanceof FormData
        ? await this.#instance.patchForm<TReturn>(url, data, actualConfig)
        : await this.#instance.patch<TReturn>(url, data, actualConfig);

    if (response === null) return null;
    return response.data;
  }

  /**
   * HTTP Put Method for JSON and FormData body
   * @param {string} url Resource URL
   * @param {TBody} data Data for patching
   * @param {string} accessToken Access token
   * @param {RawAxiosRequestConfig} config Additional requests configurations
   * @returns {Promise<AxiosResponse<TReturn> | null>} Result of T
   */
  protected async tryPut<TReturn, TBody = undefined>(
    url: string,
    data: TBody,
    accessToken?: string,
    config?: RawAxiosRequestConfig,
  ): Promise<TReturn | null> {
    const actualConfig: RawAxiosRequestConfig | undefined =
      this.getRequestConfig(accessToken, config);

    const response: AxiosResponse<TReturn> =
      data instanceof FormData
        ? await this.#instance.putForm<TReturn>(url, data, actualConfig)
        : await this.#instance.put<TReturn>(url, data, actualConfig);

    if (response === null) return null;
    return response.data;
  }

  private getRequestConfig(
    accessToken: string | undefined,
    config: RawAxiosRequestConfig<unknown> | undefined,
  ): RawAxiosRequestConfig | undefined {
    if (accessToken !== undefined) {
      return {
        ...config,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
    }

    return config;
  }
}
